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