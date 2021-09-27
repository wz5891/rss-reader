import { getItemById } from '../../api/item';
import { actionType } from './actionType';
import * as itemApi from '../../api/item';
import { getChannelById } from '../../api/channel';

export function setCurrentItemlId(channelId) {
    return {
        type: actionType.item.setCurrentItemlId,
        payload: channelId
    };
}

export function setCurrentItem(channelId) {
    return function (dispatch) {
        getItemById(channelId).then(data => {
            dispatch({
                type: actionType.item.setCurrentItem,
                payload: data
            })
        });
    }
}


export function pageQuery(page, size, channelId) {
    return function (dispatch) {
        dispatch({
            type: actionType.item.pageQueryPending,
            payload: null
        });

        itemApi.pageQuery(page, size, channelId).then(data => {
            dispatch({
                type: actionType.item.pageQueryFulfilled,
                payload: {
                    totalNumber: data.totalNumber,
                    list: data.list,
                    page: page
                }
            });
        }, error => {
            dispatch({
                type: actionType.item.pageQueryRejected,
                payload: error.message
            });
        });
    }
}

export function refresh(size, channelId) {
    return function (dispatch) {
        doRefresh(size, channelId, dispatch).then(() => { });
    }
}

const doRefresh = async (size, channelId, dispatch) => {
    try {
        dispatch({
            type: actionType.item.refreshPending,
            payload: null
        });

        let data = await itemApi.pageQuery(1, size, channelId);

        dispatch({
            type: actionType.item.refreshFulfilled,
            payload: {
                totalNumber: data.totalNumber,
                list: data.list,
                page: 1
            }
        });
    } catch (error) {
        dispatch({
            type: actionType.item.refreshRejected,
            payload: error.message
        });
    }
}



export function markAllRead(channelId) {
    return function (dispatch) {
        itemApi.markAllReadByChannelId(channelId).then(() => {
            dispatch({
                type: actionType.item.markAllRead,
                payload: null
            })

            dispatch({
                type: actionType.item.setSingleChannelMenuVisble,
                payload: false
            })
        });
    }
}


export function markAllUnRead(channelId) {
    return function (dispatch) {
        itemApi.markAllUnReadByChannelId(channelId).then(() => {
            dispatch({
                type: actionType.item.markAllUnRead,
                payload: null
            })

            dispatch({
                type: actionType.item.setSingleChannelMenuVisble,
                payload: false
            })
        });
    }
}


export function setOperateModalVisble(visble) {
    return {
        type: actionType.item.setOperateModalVisble,
        payload: visble
    }
}


export function markItemUnRead(itemId) {
    return function (dispatch) {
        itemApi.markItemUnRead(itemId).then(() => {
            dispatch({
                type: actionType.item.markItemUnRead,
                payload: itemId
            })
        });
    }
}

export function markItemRead(itemId) {
    return function (dispatch) {
        itemApi.markItemRead(itemId).then(() => {
            dispatch({
                type: actionType.item.markItemRead,
                payload: itemId
            })
        });
    }
}



export function markItemFavorite(itemId) {
    return function (dispatch) {
        itemApi.markItemFavorite(itemId).then(() => {
            dispatch({
                type: actionType.item.markItemFavorite,
                payload: itemId
            })
        });
    }
}

export function markItemUnFavorite(itemId) {
    return function (dispatch) {
        itemApi.markItemUnFavorite(itemId).then(() => {
            dispatch({
                type: actionType.item.markItemUnFavorite,
                payload: itemId
            })
        });
    }
}


export function setSingleChannelMenuVisble(visble) {
    return {
        type: actionType.item.setSingleChannelMenuVisble,
        payload: visble
    }
}

export function fetchChannelRss(channelId) {
    return function (dispatch) {
        doFetchChannelRss(channelId, dispatch).then(() => { });
    }
}

const doFetchChannelRss = async (channelId, dispatch) => {
    try {
        let channel = await getChannelById(channelId);

        dispatch({
            type: actionType.item.fetchAndSaveRssItemPending,
            payload: null
        });

        await itemApi.fetchAndSaveRssItem(channelId, channel.link);

        dispatch({
            type: actionType.item.fetchAndSaveRssItemFulfilled,
            payload: null
        });

        await doRefresh(10, channelId, dispatch);
    } catch (error) {
        dispatch({
            type: actionType.item.fetchAndSaveRssItemRejected,
            payload: error.message
        });
    }
}