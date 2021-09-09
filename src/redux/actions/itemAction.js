import { pageListFromDb } from '../../api/item';
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
