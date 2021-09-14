import { actionType } from '../actions/actionType';
import { fromJS } from 'immutable';

function initialState() {
    return fromJS({
        pageQuery: {
            pageSize: 10,
            pageIndex: 1,
            totalNumber: 0,
            dataList: [],
            refreshing: false,
            loading: false,
            hasMore: true,
            errorMsg: ''
        },
    });
}

export default function reducer(state = initialState(), action) {
    if (typeof reducer.prototype[action.type] === "function") {
        return reducer.prototype[action.type](state, action);
    }
    else {
        return state;
    }
}


// 下拉刷新
reducer.prototype[actionType.favorite.refreshPrepare] = (state, action) => {
    return state
        .setIn('pageQuery.pageIndex'.split('.'), 1)
        .setIn('pageQuery.totalNumber'.split('.'), 0)
        .setIn('pageQuery.dataList'.split('.'), fromJS([]))
        .setIn('pageQuery.refreshing'.split('.'), true);
}

// 分页查询
reducer.prototype[actionType.favorite.pageQueryPending] = (state, action) => {
    return state
        .setIn('pageQuery.loading'.split('.'), true)
        .setIn('pageQuery.errorMsg'.split('.'), '');
}

reducer.prototype[actionType.favorite.pageQueryFulfilled] = (state, action) => {
    let hasMore = false;
    let totalNumber = action.payload.totalNumber;
    let pageIndex = state.get('pageQuery').get('pageIndex');
    let pageSize = state.get('pageQuery').get('pageSize');

    if (totalNumber > pageIndex * pageSize) {
        hasMore = true;
    }

    if (hasMore) {
        pageIndex = pageIndex + 1;
    }

    return state
        .setIn('pageQuery.pageIndex'.split('.'), pageIndex)
        .setIn('pageQuery.totalNumber'.split('.'), totalNumber)
        .updateIn('pageQuery.dataList'.split('.'), list => list.concat(fromJS(action.payload.list)))
        .setIn('pageQuery.refreshing'.split('.'), false)
        .setIn('pageQuery.loading'.split('.'), false)
        .setIn('pageQuery.hasMore'.split('.'), hasMore)
        .setIn('pageQuery.errorMsg'.split('.'), '');
}

reducer.prototype[actionType.favorite.pageQueryRejected] = (state, action) => {
    return state
        .setIn('pageQuery.refreshing'.split('.'), false)
        .setIn('pageQuery.loading'.split('.'), false)
        .setIn('pageQuery.errorMsg'.split('.'), action.payload);
}