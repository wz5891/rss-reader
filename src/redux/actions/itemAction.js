import { getItemById } from '../../api/item';
import { actionType } from './actionType';
import * as itemApi from '../../api/item';

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




export function pageQuery(page, size, channelId, refresh) {
    return function (dispatch) {
        if (refresh) {
            dispatch({
                type: actionType.item.refreshPrepare,
                payload: null
            });
        }
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
    return pageQuery(1, size, channelId, true);
}




export function markAllRead(channelId) {
    return function (dispatch) {
        itemApi.markAllReadByChannelId(channelId).then(() => {
            dispatch({
                type: actionType.item.markAllRead,
                payload: null
            })

            dispatch({
                type: actionType.channel.setSingleChannelMenuVisble,
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
                type: actionType.channel.setSingleChannelMenuVisble,
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

