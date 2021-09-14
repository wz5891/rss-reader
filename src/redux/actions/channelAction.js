import { fetchAndSaveRss, fetchRss, getChannelById, saveChannelToDb } from '../../api/channel';

import * as channelApi from '../../api/channel';
import { existsByGid, markAllReadByChannelId, saveItemToDb } from '../../api/item';
import { actionType } from '../actions/actionType';
import { getFirstImageUrl } from '../../util/StringUitl';

export function setAddChannelModalVisble(visble) {
    return {
        type: actionType.channel.setAddChannelModalVisble,
        payload: visble
    }
}


export function addChannel(url) {
    return function (dispatch) {
        saveChannel(url, dispatch).then(() => {
        });
    }
}

const saveChannel = async (url, dispatch) => {
    dispatch({
        type: actionType.channel.channelAddPending,
        payload: null
    });

    try {
        let rss = await fetchRss(url);
        let channelId = await saveChannelToDb(rss);

        if (rss.items && rss.items.length > 0) {
            for (let i = 0; i < rss.items.length; i++) {
                let item = rss.items[i];
                console.log('开始保存item...');

                saveToDb(item, channelId);
            }

        }

        dispatch({
            type: actionType.channel.channelAddFulfilled,
            payload: null
        });

        dispatch({
            type: actionType.channel.setAddChannelModalVisble,
            payload: false
        });
    } catch (e) {
        debugger;
        console.log(e);
        dispatch({
            type: actionType.channel.channelAddRejected,
            payload: e.message
        });
    }
}

const saveToDb = async (item, channelId) => {
    let description = item.description;
    let content = item.content;
    if (!content) {
        content = item.description;
    }
    if (!description) {
        description = item.content;
    }
    if (description) {
        description = description.substr(0, 300);
    }
    // 查找第一张图片
    let imageUrl = getFirstImageUrl(content);

    await saveItemToDb({
        gid: item.id,
        channelId: channelId,
        title: item.title,
        link: item.links[0].url,
        description: description,
        lastUpdated: item.published,
        content: content,
        imageUrl: imageUrl
    });
}


export function pageQuery(page, size, refresh) {
    return function (dispatch) {
        if (refresh) {
            dispatch({
                type: actionType.channel.refreshPrepare,
                payload: null
            });
        }
        dispatch({
            type: actionType.channel.pageQueryPending,
            payload: null
        });
        channelApi.pageQuery(page, size).then(data => {
            dispatch({
                type: actionType.channel.pageQueryFulfilled,
                payload: {
                    totalNumber: data.totalNumber,
                    list: data.list,
                    page: page
                }
            });
        }, error => {
            dispatch({
                type: actionType.channel.pageQueryRejected,
                payload: error.message
            });
        });
    }
}

export function refresh(size) {
    return pageQuery(1, size, true);
}


export function setCurrentChannelId(channelId) {
    return {
        type: actionType.channel.setCurrentChannelId,
        payload: channelId
    };
}

export function setCurrentChannel(channelId) {
    return function (dispatch) {
        getChannelById(channelId).then(data => {
            dispatch({
                type: actionType.channel.setCurrentChannel,
                payload: data
            })
        });
    }
}


export function fetchChannelRss(channelId) {
    return function (dispatch) {
        fetchChannel(channelId).then(() => {
            dispatch({
                type: actionType.channel.pageQueryPending,
                payload: null
            });
        });
    }
}


const fetchChannel = async (channelId) => {
    let channel = await getChannelById(channelId);
    let rss = await fetchRss(channel.link);

    let items = rss.items;
    if (items.length > 0) {
        console.log('更新到文章：' + items.length);
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let exists = await existsByGid(item.id, channelId);
            if (!exists) {
                console.log('存储文章:' + item.id);
                await saveToDb(item, channelId);
            } else {
                console.log('文章已存在:' + item.id);
            }
        }
    } else {
        console.log('没有文章更新');
    }
}


