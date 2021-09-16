import { getDatabase } from "../db/Database";

export const saveItemToDb = async ({ gid, channelId, title, link, description, lastUpdated, content, imageUrl }) => {
    let db = await getDatabase();
    let result = await db.transaction(async (tx) => {
        await tx.executeSql(
            'INSERT INTO t_item(gid,channel_id ,title,link,description,published_time,content,image_url,has_read,has_favorite) VALUES (?,?,?,?,?,?,?,?,0,0)',
            [gid, channelId, title, link, description, lastUpdated, content, imageUrl],
        );
    });
}

export const existsByGid = async (gid, channelId) => {
    let db = await getDatabase();
    let result = await db.executeSql(`SELECT count(1) as size FROM t_item WHERE channel_id=${channelId} AND gid= '${gid}'`);
    let size = result[0].rows.item(0).size;
    if (size > 0) {
        return true;
    } else {
        return false;
    }
}

export const existsByLink = async (link, channelId) => {
    let db = await getDatabase();
    let result = await db.executeSql(`SELECT count(1) as size FROM t_item WHERE channel_id=${channelId} AND link= '${link}'`);
    let size = result[0].rows.item(0).size;
    if (size > 0) {
        return true;
    } else {
        return false;
    }
}



export const getItemById = async (itemId) => {
    let db = await getDatabase();
    let result = await db.executeSql(`SELECT * FROM t_item WHERE id= ${itemId}`);

    let rows = result[0].rows;
    let length = rows.length;
    if (length > 0) {
        let item = rows.item(0);
        return ({
            id: item.id,
            title: item.title,
            link: item.link,
            description: item.description,
            publishedTime: item.published_time,
            content: item.content,
            imageUrl: item.image_url,
            hasRead: item.has_read,
            hasFavorite: item.has_favorite
        });
    } else {
        return [];
    }
}

export const pageQuery = async (page, size, channelId) => {
    let db = await getDatabase();
    let countSql = `SELECT count(1) as totalNumber FROM t_item WHERE channel_id = ${channelId}`;

    // 先查询数据总条数
    let totalNumberResult = await db.executeSql(countSql);
    let totalNumber = totalNumberResult[0].rows.item(0).totalNumber;

    // 再查询当前页的数据
    let listSql = `SELECT * FROM t_item WHERE channel_id = ${channelId} ORDER BY id DESC limit ${size} offset ${(page - 1) * size}`;

    let pageResult = await db.executeSql(listSql);
    return pageQueryResult(totalNumber, pageResult);
}


export const pageQueryForFavorite = async (page, size) => {
    let db = await getDatabase();
    let countSql = `SELECT count(1) as totalNumber FROM t_item WHERE has_favorite = 1`;

    // 先查询数据总条数
    let totalNumberResult = await db.executeSql(countSql);
    let totalNumber = totalNumberResult[0].rows.item(0).totalNumber;

    // 再查询当前页的数据
    let listSql = `SELECT * FROM t_item WHERE has_favorite = 1 ORDER BY id DESC limit ${size} offset ${(page - 1) * size}`;

    let pageResult = await db.executeSql(listSql);
    return pageQueryResult(totalNumber, pageResult);
}

const pageQueryResult = (totalNumber, pageResult) => {
    let rows = pageResult[0].rows;
    let length = rows.length;
    let list = [];
    if (length > 0) {
        for (let i = 0; i < length; i++) {
            let item = rows.item(i);
            list.push({
                id: item.id,
                title: item.title,
                link: item.link,
                description: item.description,
                publishedTime: item.published_time,
                imageUrl: item.image_url,
                hasRead: item.has_read,
                hasFavorite: item.has_favorite
            });
        }
    }

    return {
        totalNumber,
        list
    }
}



export const markAllReadByChannelId = async (channelId) => {
    let db = await getDatabase();
    await db.executeSql(`UPDATE t_item SET has_read=1 WHERE channel_id= ${channelId}`);
}


export const markAllUnReadByChannelId = async (channelId) => {
    let db = await getDatabase();
    await db.executeSql(`UPDATE t_item SET has_read=0 WHERE channel_id= ${channelId}`);
}


export const markItemUnRead = async (itemId) => {
    let db = await getDatabase();
    await db.executeSql(`UPDATE t_item SET has_read=0 WHERE id= ${itemId}`);
}


export const markItemRead = async (itemId) => {
    let db = await getDatabase();
    await db.executeSql(`UPDATE t_item SET has_read=1 WHERE id= ${itemId}`);
}


export const markItemFavorite = async (itemId) => {
    let db = await getDatabase();
    await db.executeSql(`UPDATE t_item SET has_favorite=1 WHERE id= ${itemId}`);
}


export const markItemUnFavorite = async (itemId) => {
    let db = await getDatabase();
    await db.executeSql(`UPDATE t_item SET has_favorite=0 WHERE id= ${itemId}`);
}