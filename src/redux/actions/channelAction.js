import { getChannelById, saveChannelToDb } from '../../api/channel';

import * as channelApi from '../../api/channel';
import { existsByGid, existsByLink, fetchAndSaveRssItem, markAllReadByChannelId, saveItemToDb, saveToDb } from '../../api/item';
import { actionType } from '../actions/actionType';
import { getFirstImageUrl } from '../../util/StringUitl';
import { fetchRss } from '../../api/rss';

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


        doRefresh(10, dispatch);
    } catch (e) {
        debugger;
        console.log(e);
        alert(JSON.stringify(e));
        dispatch({
            type: actionType.channel.channelAddRejected,
            payload: e.message
        });
    }
}


export function pageQuery(page, size) {
    return function (dispatch) {
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
    return function (dispatch) {
        doRefresh(size, dispatch).then(() => { });
    }
}

const doRefresh = async (size, dispatch) => {
    dispatch({
        type: actionType.channel.refreshPending,
        payload: null
    });

    channelApi.pageQuery(1, size).then(data => {
        dispatch({
            type: actionType.channel.refreshFulfilled,
            payload: {
                totalNumber: data.totalNumber,
                list: data.list,
                page: 1
            }
        });
    }, error => {
        dispatch({
            type: actionType.channel.refreshRejected,
            payload: error.message
        });
    });
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

export function fetchAllChannelRss(size) {
    return function (dispatch) {
        dispatch({
            type: actionType.channel.fetchAllChannelPending,
            payload: null
        });
        fetchAllChannel().then(() => {
            dispatch({
                type: actionType.channel.fetchAllChannelFulfilled,
                payload: null
            });

            doRefresh(size, dispatch).then(() => { });
        }, error => {
            dispatch({
                type: actionType.channel.fetchAllChannelRejected,
                payload: null
            });
        });
    }
}

const fetchAllChannel = async () => {
    let list = await channelApi.getAllChannel();
    if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
            let channel = await getChannelById(list[i].id);
            await fetchAndSaveRssItem(channel.id, channel.link);
        }
    }
}
