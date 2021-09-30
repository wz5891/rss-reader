import moment from 'moment';
import { getDatabase } from '../db/Database';

export const saveToDb = async (title) => {
    let db = await getDatabase();

    // 检查是否已经添加过
    let result = await db.executeSql(`SELECT count(1) as size FROM t_category WHERE title = '${title.trim()}'`);
    if (result[0].rows.item(0).size > 0) {
        throw new Error('当前分组已经存在，请不要重复添加');
    }

    let id = null;
    await db.transaction(async (tx) => {
        let r = await tx.executeSql(
            'INSERT INTO t_category(title) VALUES (?)',
            [title],
        );
        id = r[1].insertId;
    });

    return id;
}

export const list = async () => {
    let db = await getDatabase();
    let pageResult = await db.executeSql(`SELECT t.* FROM t_category t ORDER BY t.id ASC`);
    let rows = pageResult[0].rows;
    let length = rows.length;
    let list = [];
    if (length > 0) {
        for (let i = 0; i < length; i++) {
            let item = rows.item(i);
            list.push({
                id: item.id,
                title: item.title
            });
        }
    }

    return list;
}

export const deleteById = async (id) => {
    let db = await getDatabase();
    await db.executeSql(`DELETE FROM t_category WHERE id= ${id}`);
}

export const updateById = async (id, title) => {
    let db = await getDatabase();
    await db.executeSql(`UPDATE t_category SET title=${title} WHERE id= ${id}`);
}
