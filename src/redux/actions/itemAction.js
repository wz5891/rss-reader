import { getItemById, pageListFromDb } from '../../api/item';
import { actionType } from './actionType';
import * as itemApi from '../../api/item';



export function pageQueryItem(page, size, channelId) {
    return function (dispatch) {
        pageListFromDb(page, size, channelId).then(list => {
            dispatch({
                type: actionType.item.setItemList,
                payload: list
            });
        });
    }
}


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




export function pageQuery(page, size, refresh) {
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
        itemApi.pageQuery(page, size).then(data => {
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

export function refresh(size) {
    return pageQuery(1, size, true);
}
