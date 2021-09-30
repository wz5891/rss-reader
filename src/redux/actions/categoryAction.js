
import * as categoryApi from '../../api/category';
import { actionType } from './actionType';


export function setAddCategoryModalVisble(visble) {
    return {
        type: actionType.category.setAddCategoryModalVisble,
        payload: visble
    }
}


export function setCurrent(channelId) {
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

            dispatch({
                type: actionType.category.setAddCategoryModalVisble,
                payload: false
            });
        }, error => {
            dispatch({
                type: actionType.category.categoryAddRejected,
                payload: error.message
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