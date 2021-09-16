import { actionType } from '../actions/actionType';
import { fromJS } from 'immutable';

function initialState() {
    return fromJS({
        currentItemId: undefined,
        currentItem: {},

        operateModalVisble: false,

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

        fetchingSingle: false,
        singleChannelMenuVisble: false,
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


reducer.prototype[actionType.item.setCurrentItemlId] = (state, action) => {
    return state.set('currentItemId', action.payload).set('currentItem', fromJS({}));
}

reducer.prototype[actionType.item.setCurrentItem] = (state, action) => {
    return state.set('currentItem', fromJS(action.payload));
}

// 下拉刷新
reducer.prototype[actionType.item.refreshPending] = (state, action) => {
    return state
        .setIn('pageQuery.refreshing'.split('.'), true)
        .setIn('pageQuery.loading'.split('.'), false)
        .setIn('pageQuery.errorMsg'.split('.'), '')
        .setIn('pageQuery.pageIndex'.split('.'), 1);
}

reducer.prototype[actionType.item.refreshFulfilled] = (state, action) => {
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
        .setIn('pageQuery.dataList'.split('.'), fromJS(action.payload.list))
        .setIn('pageQuery.refreshing'.split('.'), false)
        .setIn('pageQuery.loading'.split('.'), false)
        .setIn('pageQuery.hasMore'.split('.'), hasMore)
        .setIn('pageQuery.errorMsg'.split('.'), '');
}

reducer.prototype[actionType.item.refreshRejected] = (state, action) => {
    return state
        .setIn('pageQuery.refreshing'.split('.'), false)
        .setIn('pageQuery.loading'.split('.'), false)
        .setIn('pageQuery.errorMsg'.split('.'), action.payload);
}


// 分页查询
reducer.prototype[actionType.item.pageQueryPending] = (state, action) => {
    return state
        .setIn('pageQuery.loading'.split('.'), true)
        .setIn('pageQuery.errorMsg'.split('.'), '');
}

reducer.prototype[actionType.item.pageQueryFulfilled] = (state, action) => {
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

reducer.prototype[actionType.item.pageQueryRejected] = (state, action) => {
    return state
        .setIn('pageQuery.refreshing'.split('.'), false)
        .setIn('pageQuery.loading'.split('.'), false)
        .setIn('pageQuery.errorMsg'.split('.'), action.payload);
}


reducer.prototype[actionType.item.markAllRead] = (state, action) => {
    return state.updateIn('pageQuery.dataList'.split('.'), list => list.map(item => {
        return item.set('hasRead', 1);
    }));
}



reducer.prototype[actionType.item.markAllUnRead] = (state, action) => {
    return state.updateIn('pageQuery.dataList'.split('.'), list => list.map(item => {
        return item.set('hasRead', 0);
    }));
}


reducer.prototype[actionType.item.setOperateModalVisble] = (state, action) => {
    return state.set('operateModalVisble', action.payload);
}


reducer.prototype[actionType.item.markItemRead] = (state, action) => {
    return state.updateIn('pageQuery.dataList'.split('.'), list => list.map(item => {
        if (item.get('id') == action.payload) {
            return item.set('hasRead', 1);
        } else {
            return item;
        }
    }));
}

reducer.prototype[actionType.item.markItemUnRead] = (state, action) => {
    return state.updateIn('pageQuery.dataList'.split('.'), list => list.map(item => {
        if (item.get('id') == action.payload) {
            return item.set('hasRead', 0);
        } else {
            return item;
        }
    }));
}



reducer.prototype[actionType.item.markItemFavorite] = (state, action) => {
    return state.updateIn('pageQuery.dataList'.split('.'), list => list.map(item => {
        if (item.get('id') == action.payload) {
            return item.set('hasFavorite', 1);
        } else {
            return item;
        }
    })).set('currentItem', state.get('currentItem').set('hasFavorite', 1));
}

reducer.prototype[actionType.item.markItemUnFavorite] = (state, action) => {
    return state.updateIn('pageQuery.dataList'.split('.'), list => list.map(item => {
        if (item.get('id') == action.payload) {
            return item.set('hasFavorite', 0);
        } else {
            return item;
        }
    })).set('currentItem', state.get('currentItem').set('hasFavorite', 0));
}



// 更新某个
reducer.prototype[actionType.item.fetchAndSaveRssItemPending] = (state, action) => {
    return state.set('fetchingSingle', true);
}
reducer.prototype[actionType.item.fetchAndSaveRssItemFulfilled] = (state, action) => {
    return state.set('fetchingSingle', false);
}
reducer.prototype[actionType.item.fetchAndSaveRssItemRejected] = (state, action) => {
    return state.set('fetchingSingle', false);
}

reducer.prototype[actionType.item.setSingleChannelMenuVisble] = (state, action) => {
    return state.set('singleChannelMenuVisble', action.payload);
}

