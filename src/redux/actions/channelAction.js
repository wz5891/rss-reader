import { fetchAndSaveRss, fetchRss, getChannelById, pageListFromDb, saveChannelToDb } from '../../api/channel';

import * as channelApi from '../../api/channel';
import { saveItemToDb } from '../../api/item';
import { actionType } from '../actions/actionType';

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

                await saveItemToDb({
                    channelId: channelId,
                    title: item.title,
                    link: item.links[0].url,
                    description: item.description,
                    lastUpdated: item.published,
                    content: item.content
                });
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
        dispatch({
            type: actionType.channel.channelAddRejected,
            payload: e.message
        });
    }
}

