import { getDatabase } from "../db/Database";

export const saveItemToDb = async ({ channelId, title, link, description, lastUpdated, content }) => {
    let db = await getDatabase();
    let result = await db.transaction(async (tx) => {
        await tx.executeSql(
            'INSERT INTO t_item(channel_id ,title,link,description,published_time,content) VALUES (?,?,?,?,?,?)',
            [channelId, title, link, description, lastUpdated, content],
        );
    });
}



export const pageListFromDb = async (page, size, channelId) => {
    let db = await getDatabase();
    let result = await db.executeSql(`SELECT id,title,link,description,published_time FROM t_item WHERE channel_id = ${channelId} ORDER BY id DESC limit ${size} offset ${(page - 1) * size}`);

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
                publishedTime: item.publishedTime
            });
        }
        return list;
    } else {
        return [];
    }
}
