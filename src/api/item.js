import { getDatabase } from "../db/Database";

export const saveItemToDb = async ({ channelId, title, link, description, lastUpdated, content, imageUrl }) => {
    let db = await getDatabase();
    let result = await db.transaction(async (tx) => {
        await tx.executeSql(
            'INSERT INTO t_item(channel_id ,title,link,description,published_time,content,image_url) VALUES (?,?,?,?,?,?,?)',
            [channelId, title, link, description, lastUpdated, content, imageUrl],
        );
    });
}



export const pageListFromDb = async (page, size, channelId) => {
    let db = await getDatabase();
    let result = await db.executeSql(`SELECT id,title,link,description,published_time,image_url FROM t_item WHERE channel_id = ${channelId} ORDER BY id DESC limit ${size} offset ${(page - 1) * size}`);

    let rows = result[0].rows;
    let length = rows.length;
    if (length > 0) {
        let list = [];
        for (let i = 0; i < length; i++) {
            let item = rows.item(i);
            list.push({
                id: item.id,
                title: item.title,
                link: item.link,
                description: item.description,
                publishedTime: item.published_time,
                imageUrl: item.image_url
            });
        }
        return list;
    } else {
        return [];
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
            imageUrl: item.image_url
        });
    } else {
        return [];
    }
}



export const pageQuery = async (page, size) => {
    let db = await getDatabase();
    // 先查询数据总条数
    let totalNumberResult = await db.executeSql(`SELECT count(1) as totalNumber FROM t_item`);
    let totalNumber = totalNumberResult[0].rows.item(0).totalNumber;

    // 再查询当前页的数据
    let pageResult = await db.executeSql(`SELECT * FROM t_item ORDER BY id DESC limit ${size} offset ${(page - 1) * size}`);
    let rows = pageResult[0].rows;
    let length = rows.length;
    let list = [];
    if (length > 0) {
        for (let i = 0; i < length; i++) {
            let item = rows.item(i);
            debugger;
            list.push({
                id: item.id,
                title: item.title,
                link: item.link,
                description: item.description,
                publishedTime: item.published_time,
                imageUrl: item.image_url
            });
        }
    }

    return {
        totalNumber,
        list
    }
}