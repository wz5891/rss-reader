import { actionType } from './actionType';
import * as itemApi from '../../api/item';

export function pageQuery(page, size, refresh) {
    return function (dispatch) {
        if (refresh) {
            dispatch({
                type: actionType.favorite.refreshPrepare,
                payload: null
            });
        }
        dispatch({
            type: actionType.favorite.pageQueryPending,
            payload: null
        });
        itemApi.pageQueryForFavorite(page, size).then(data => {
            dispatch({
                type: actionType.favorite.pageQueryFulfilled,
                payload: {
                    totalNumber: data.totalNumber,
                    list: data.list,
                    page: page
                }
            });
        }, error => {
            dispatch({
                type: actionType.favorite.pageQueryRejected,
                payload: error.message
            });
        });
    }
}

export function refresh(size) {
    return pageQuery(1, size, true);
}

