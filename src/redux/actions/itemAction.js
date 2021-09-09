import { getItemById, pageListFromDb } from '../../api/item';
import { actionType } from './actionType';



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

