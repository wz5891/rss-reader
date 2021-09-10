import * as rssParser from 'react-native-rss-parser';
import { getDatabase } from '../db/Database';
export const fetchRss = async (url) => {

    let response = await fetch(url);
    let text = await response.text();

    let rss = await rssParser.parse(text);
    let title = rss.title;
    let link = rss.links[1].url;
    let description = rss.description;
    let lastUpdated = rss.lastUpdated;
    let items = rss.items;


    return {
        title, link, description, lastUpdated, items
    };
}


export const saveChannelToDb = async ({ title, link, description, lastUpdated }) => {
    let db = await getDatabase();

    // 检查是否已经添加过
    let result = await db.executeSql(`SELECT count(1) as size FROM t_channel WHERE link = '${link.trim()}'`);
    if (result[0].rows.item(0).size > 0) {
        throw new Error('当前订阅已经存在，请不要重复添加');
    }

    debugger

    let id = null;
    await db.transaction(async (tx) => {
        let r = await tx.executeSql(
            'INSERT INTO t_channel(title,link,description,updated_time) VALUES (?,?,?,?)',
            [title, link, description, lastUpdated],
        );
        id = r[1].insertId;
    });

    return id;
}


export const pageListFromDb = async (page, size) => {
    let db = await getDatabase();
    let result = await db.executeSql(`SELECT * FROM t_channel ORDER BY id DESC limit ${size} offset ${(page - 1) * size}`);

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
                lastUpdated: item.lastUpdated
            });
        }
        return list;
    } else {
        return [];
    }
}


export const getChannelById = async (channelId) => {
    let db = await getDatabase();
    let result = await db.executeSql(`SELECT * FROM t_channel WHERE id= ${channelId}`);

    let rows = result[0].rows;
    let length = rows.length;
    if (length > 0) {
        let item = rows.item(0);
        return ({
            id: item.id,
            title: item.title,
            link: item.link,
            description: item.description,
            lastUpdated: item.lastUpdated
        });
    } else {
        return [];
    }
}
