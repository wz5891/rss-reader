import SQLite from 'react-native-sqlite-storage';
import * as RNLocalize from 'react-native-localize';
import dbUpgrade from './db-upgrade.json';
import {
  CONFIG_LANGUAGE,
  CONFIG_HAS_READ_WELCOME_SCREEN,
  CONFIG_USER,
  CONFIG_TOKEN,
  CONFIG_LATITUDE,
  CONFIG_LONGITUDE,
  CONFIG_IOS_VERSION_NUMBER,
  CONFIG_ANDROID_VERSION_NUMBER,
  readConfigData,
  saveOrUpdateConfigData,
  CONFIG_IS_FIRST_USE_AFTER_INSTALL,
  CONFIG_BACKGROUND_FCM_NOTIFICATION,
  deleteConfigData,
} from './configData';
const locales = RNLocalize.getLocales();
const systemLanguage = locales[0].languageTag; // 用户系统偏好语言

let databaseInstance;
let config;
let hasDoingInit = false;

const getDatabase = async () => {
  if (!hasDoingInit) {
    hasDoingInit = true;
    return open();
  } else {
    return new Promise((resolve, reject) => {
      if (databaseInstance !== undefined) {
        resolve(databaseInstance);
      } else {
        // 等待初始化完成
        let timer = setInterval(() => {
          if (databaseInstance !== undefined) {
            resolve(databaseInstance);
            clearInterval(timer);
          }
        }, 1000);
      }
    });
  }
}

async function open() {
  SQLite.DEBUG(true);
  SQLite.enablePromise(true);

  if (databaseInstance) {
    console.log(
      '[db] Database is already open: returning the existing instance',
    );
    return databaseInstance;
  }

  const db = await SQLite.openDatabase({
    name: 'rss.db',
    location: 'default',
  });

  // Perform any database initialization or updates, if needed
  await initDatabaseTables(db);
  databaseInstance = db;
  return db;
}

// Close the connection to the database
async function close() {
  if (databaseInstance === undefined) {
    return;
  }
  const status = await databaseInstance.close();
  databaseInstance = undefined;
}

async function initDatabaseTables(db) {
  // 版本表
  let versionTableExists = await db
    .executeSql(
      "SELECT COUNT(1) as count FROM sqlite_master WHERE type='table' AND name='version';",
    )
    .then(([result]) => {
      let { count } = result.rows.item(0);

      return count == 0 ? false : true;
    });
  console.log('[db] VersionTableExists:' + versionTableExists);

  if (!versionTableExists) {
    await db.transaction((tx) => {
      tx.executeSql(`CREATE TABLE version (version integer);`);
    });
  }

  let version = await db
    .executeSql('SELECT max(version) as version FROM version;')
    .then(([result]) => {
      let { version } = result.rows.item(0);
      console.log('[db] Version in db:' + version);
      return version;
    });
  if (!version) {
    version = 0;
  }
  console.log('[db] Version:' + version + ',Target Version:' + dbUpgrade.version);
  if (version < dbUpgrade.version) {
    await upgradeFrom(db, version);
  }

  let language = await readConfigData(db, CONFIG_LANGUAGE);
  if (!language) {
    let language = 'en';
    // 初始化语言
    await saveOrUpdateConfigData(db, CONFIG_LANGUAGE, language);
  }
}

//策略来自 http://www.embusinessproducts.com/react-native-sqlite-database-upgrade-strategy/
const upgradeFrom = async (db, previousVersion) => {
  console.log('begain db version upgrade...');
  try {
    let statements = [];
    let version = dbUpgrade.version - (dbUpgrade.version - previousVersion) + 1;
    let length = Object.keys(dbUpgrade.upgrades).length;

    for (let i = 0; i < length; i += 1) {
      let upgrade = dbUpgrade.upgrades[`to_v${version}`];

      if (upgrade) {
        statements = [...statements, ...upgrade];
      } else {
        break;
      }

      version++;
    }

    statements = [
      ...statements,
      ...[['REPLACE into version (version) VALUES (?);', [dbUpgrade.version]]],
    ];

    await db.sqlBatch(statements);

    console.log('Db version upgrade finish!');
  } catch (err) {
    console.log('Db version upgrade error:' + JSON.stringify(err));
  }
};

async function getConfig() {
  let language = await getLanguage();
  let hasReadWelcomeScreen = await getHasReadWelcomeScreen();
  let user = await getUser();
  let token = await getToken();
  let { longitude, latitude } = await getLocation();
  let iosVersionNumber = await getIosVersionNumber();
  let androidVersionNumber = await getAndroidVersionNumber();

  return {
    language,
    hasReadWelcomeScreen,
    user,
    token,
    latitude,
    longitude,
    iosVersionNumber,
    androidVersionNumber,
  };
}

async function clearConfig() {
  let db = await getDatabase();
  await deleteConfigData(db, CONFIG_LANGUAGE);
  await deleteConfigData(db, CONFIG_HAS_READ_WELCOME_SCREEN);
  await deleteConfigData(db, CONFIG_USER);
  await deleteConfigData(db, CONFIG_TOKEN);
  await deleteConfigData(db, CONFIG_LATITUDE);
  await deleteConfigData(db, CONFIG_LONGITUDE);
  await deleteConfigData(db, CONFIG_IOS_VERSION_NUMBER);
  await deleteConfigData(db, CONFIG_ANDROID_VERSION_NUMBER);
}

async function getLanguage() {
  let db = await getDatabase();
  let language = await readConfigData(db, CONFIG_LANGUAGE);

  return language;
}

async function saveLanguage(language) {
  let db = await getDatabase();
  await saveOrUpdateConfigData(db, CONFIG_LANGUAGE, language);
}

async function getHasReadWelcomeScreen() {
  let db = await getDatabase();
  let hasReadWelcomeScreen = await readConfigData(
    db,
    CONFIG_HAS_READ_WELCOME_SCREEN,
  );
  return hasReadWelcomeScreen == 'YES' ? true : false;
}

async function saveHasReadWelcomeScreen(hasRead) {
  let db = await getDatabase();
  let hasReadWelcomeScreen = hasRead ? 'YES' : 'NO';

  await saveOrUpdateConfigData(db, CONFIG_HAS_READ_WELCOME_SCREEN, hasRead);
}

async function getUser() {
  let db = await getDatabase();
  let user = await readConfigData(db, CONFIG_USER);

  return user ? JSON.parse(user) : null;
}

async function saveUser(user) {
  let db = await getDatabase();
  let userData = JSON.stringify(user);

  await saveOrUpdateConfigData(db, CONFIG_USER, userData);
}

async function getToken() {
  let db = await getDatabase();
  let token = await readConfigData(db, CONFIG_TOKEN);

  return token;
}

async function saveToken(token) {
  let db = await getDatabase();
  await saveOrUpdateConfigData(db, CONFIG_TOKEN, token);
}

async function getLocation() {
  let db = await getDatabase();
  let latitude = await readConfigData(db, CONFIG_LATITUDE);
  let longitude = await readConfigData(db, CONFIG_LONGITUDE);
  return {
    latitude,
    longitude,
  };
}

async function saveLocation(latitude, longitude) {
  let db = await getDatabase();
  await saveOrUpdateConfigData(db, CONFIG_LATITUDE, latitude);
  await saveOrUpdateConfigData(db, CONFIG_LONGITUDE, longitude);
}

async function getIosVersionNumber() {
  let db = await getDatabase();
  let versionNumber = await readConfigData(db, CONFIG_IOS_VERSION_NUMBER);

  return versionNumber ? versionNumber * 1 : 0;
}
async function saveIosVersionNumber(versionNumber) {
  let db = await getDatabase();
  await saveOrUpdateConfigData(db, CONFIG_IOS_VERSION_NUMBER, versionNumber);
}

async function getAndroidVersionNumber() {
  let db = await getDatabase();
  let versionNumber = await readConfigData(db, CONFIG_ANDROID_VERSION_NUMBER);

  return versionNumber ? versionNumber * 1 : 0;
}
async function saveAndroidVersionNumber(versionNumber) {
  let db = await getDatabase();
  await saveOrUpdateConfigData(
    db,
    CONFIG_ANDROID_VERSION_NUMBER,
    versionNumber,
  );
}

async function getIsFirstUseAfterInstall() {
  let db = await getDatabase();
  let firstUse = await readConfigData(db, CONFIG_IS_FIRST_USE_AFTER_INSTALL);

  return firstUse ? false : true;
}
async function saveIsFirstUseAfterInstallToNo() {
  let db = await getDatabase();
  await saveOrUpdateConfigData(db, CONFIG_IS_FIRST_USE_AFTER_INSTALL, 'NO');
}

async function getBackgroundFcmNotification() {
  let db = await getDatabase();
  let notification = await readConfigData(
    db,
    CONFIG_BACKGROUND_FCM_NOTIFICATION,
  );

  return notification ? JSON.parse(notification) : [];
}
async function saveBackgroundFcmNotification(noticeType, orderId) {
  let db = await getDatabase();
  let notificationStr = await readConfigData(
    db,
    CONFIG_BACKGROUND_FCM_NOTIFICATION,
  );

  let notification = notificationStr ? JSON.parse(notificationStr) : [];
  notification.push({
    noticeType,
    orderId,
  });

  await saveOrUpdateConfigData(
    db,
    CONFIG_BACKGROUND_FCM_NOTIFICATION,
    JSON.stringify(notification),
  );
}

async function deleteBackgroundFcmNotification() {
  let db = await getDatabase();
  await deleteConfigData(db, CONFIG_BACKGROUND_FCM_NOTIFICATION);
}

export {
  getDatabase,
  getConfig as getConfigFromDb,
  clearConfig as clearConfigFromDb,
  getLanguage as getLanguageFromDb,
  saveLanguage as saveLanguageToDb,
  getHasReadWelcomeScreen as getHasReadWelcomeScreenFromDb,
  saveHasReadWelcomeScreen as saveHasReadWelcomeScreenToDb,
  getUser as getUserFromDb,
  saveUser as saveUserToDb,
  getToken as getTokenFromDb,
  saveToken as saveTokenToDb,
  getLocation as getLocationFromDb,
  saveLocation as saveLocationToDb,
  getIosVersionNumber as getIosVersionNumberFromDb,
  saveIosVersionNumber as saveIosVersionNumberToDb,
  getAndroidVersionNumber as getAndroidVersionNumberFromDb,
  saveAndroidVersionNumber as saveAndroidVersionNumberToDb,
  getIsFirstUseAfterInstall as getIsFirstUseAfterInstallFromDb,
  saveIsFirstUseAfterInstallToNo as saveIsFirstUseAfterInstallToNoToDb,
  getBackgroundFcmNotification as getBackgroundFcmNotificationFromDb,
  saveBackgroundFcmNotification as saveBackgroundFcmNotificationToDb,
  deleteBackgroundFcmNotification as deleteBackgroundFcmNotificationToDb,
};
