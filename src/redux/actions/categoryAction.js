
import * as categoryApi from '../../api/category';
import { actionType } from './actionType';


export function setCurrentChannel(channelId) {
    return {
        type: actionType.category.setCurrentCategory,
        payload: channelId
    }
}

export function addCategory(title) {
    return function (dispatch) {
        dispatch({
            type: actionType.category.categoryAddPending,
            payload: null
        });
        categoryApi.saveToDb(title).then((id) => {
            dispatch({
                type: actionType.category.categoryAddFulfilled,
                payload: {
                    id: id,
                    title: title
                }
            });
        }, error => {
            dispatch({
                type: actionType.channel.channelAddRejected,
                payload: e.message
            });
        });
    }
}

export function list() {
    return function (dispatch) {
        dispatch({
            type: actionType.category.listPending,
            payload: null
        });

        categoryApi.list().then(data => {
            dispatch({
                type: actionType.category.listFulfilled,
                payload: data
            });
        }, error => {
            dispatch({
                type: actionType.category.listRejected,
                payload: error.message
            });
        });
    }
}