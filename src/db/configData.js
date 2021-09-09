export const CONFIG_LANGUAGE = "language";

const configDataExists = async (db, configKey) => {
  let configValue = await configDataExists(db, configKey);
  return configValue ? false : true;
};

const readConfigData = async (db, key) => {
  let results = await db.executeSql(
    `SELECT value FROM t_config WHERE key='${key}';`,
  );
  if (!results[0]?.rows?.length) {
    console.log('DB QUERY[' + key + '] ==> NOT EXISTS');
    return null;
  } else {
    const { value } = results[0].rows.item(0);
    console.log('DB QUERY[' + key + ']=>[' + value + ']');
    return value;
  }
};

const deleteConfigData = async (db, configKey) => {
  console.log('DB DELETE[' + configKey + ']');
  await db.transaction((tx) => {
    tx.executeSql('DELETE FROM t_config WHERE config_key = ?;', [configKey]);
  });
};

const saveOrUpdateConfigData = async (db, key, value) => {
  value = '' + value;

  let oldValue = await readConfigData(db, key);

  if (oldValue || oldValue === '') {
    if (!value) {
      console.log('DB UPDATE[' + key + ']=>[]');
      await db.transaction((tx) => {
        tx.executeSql(
          'UPDATE t_config SET value = "" WHERE key = ?',
          [key],
        );
      });
      return '';
    } else {
      if (oldValue !== value) {
        console.log('DB UPDATE[' + key + ']=>[' + value + ']');
        await db.transaction((tx) => {
          tx.executeSql(
            'UPDATE t_config SET value = ? WHERE key = ?',
            [value, key],
          );
        });
      } else {
        console.log(
          'DB NO NEED UPDATE[' + key + ']=>[' + value + ']',
        );
      }
    }
  } else {
    console.log('DB-INSERT[' + key + ']=>[' + value + ']');

    await db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO t_config(key,value) VALUES(?,?);',
        [key, value],
      );
    });
  }
};

export {
  configDataExists,
  readConfigData,
  saveOrUpdateConfigData,
  deleteConfigData,
};
