import { actionType } from '../actions/actionType';
import { fromJS } from 'immutable';
import { act } from 'react-test-renderer';

function initialState() {
    return fromJS({
        channelModalVisble: false,
        singleChannelMenuVisble: false,

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

        currentChannelId: undefined,
        currentChannel: {},

        add: {
            doing: false,
            errorMsg: ''
        },

        fetchAll: {
            loading: false
        },

        fetchingSingle: false
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

reducer.prototype[actionType.channel.setAddChannelModalVisble] = (state, action) => {
    return state.set('channelModalVisble', action.payload);
}


reducer.prototype[actionType.channel.setCurrentChannelId] = (state, action) => {
    return state.set('currentChannelId', action.payload);
}


reducer.prototype[actionType.channel.setCurrentChannel] = (state, action) => {
    return state.set('currentChannel', fromJS(action.payload));
}


reducer.prototype[actionType.channel.channelAddPending] = (state, action) => {
    return state.setIn('add.doing'.split('.'), true)
        .setIn('add.errorMsg'.split('.'), '');
}

reducer.prototype[actionType.channel.channelAddFulfilled] = (state, action) => {
    return state.setIn('add.doing'.split('.'), false)
        .setIn('add.errorMsg'.split('.'), '');
}

reducer.prototype[actionType.channel.channelAddRejected] = (state, action) => {
    return state.setIn('add.doing'.split('.'), false)
        .setIn('add.errorMsg'.split('.'), action.payload);
}

// 下拉刷新
reducer.prototype[actionType.channel.refreshPending] = (state, action) => {
    return state
        .setIn('pageQuery.pageIndex'.split('.'), 1)
        .setIn('pageQuery.refreshing'.split('.'), true)
        .setIn('pageQuery.loading'.split('.'), false)
        .setIn('pageQuery.errorMsg'.split('.'), '');
}

reducer.prototype[actionType.channel.refreshFulfilled] = (state, action) => {
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

reducer.prototype[actionType.channel.refreshRejected] = (state, action) => {
    return state
        .setIn('pageQuery.refreshing'.split('.'), false)
        .setIn('pageQuery.loading'.split('.'), false)
        .setIn('pageQuery.errorMsg'.split('.'), action.payload);
}


// 分页查询
reducer.prototype[actionType.channel.pageQueryPending] = (state, action) => {
    return state
        .setIn('pageQuery.loading'.split('.'), true)
        .setIn('pageQuery.errorMsg'.split('.'), '');
}

reducer.prototype[actionType.channel.pageQueryFulfilled] = (state, action) => {
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

reducer.prototype[actionType.channel.pageQueryRejected] = (state, action) => {
    return state
        .setIn('pageQuery.refreshing'.split('.'), false)
        .setIn('pageQuery.loading'.split('.'), false)
        .setIn('pageQuery.errorMsg'.split('.'), action.payload);
}


// 更新全部
reducer.prototype[actionType.channel.fetchAllChannelPending] = (state, action) => {
    return state
        .setIn('fetchAll.loading'.split('.'), true);
}
reducer.prototype[actionType.channel.fetchAllChannelFulfilled] = (state, action) => {
    return state
        .setIn('fetchAll.loading'.split('.'), false);
}
reducer.prototype[actionType.channel.fetchAllChannelRejected] = (state, action) => {
    return state
        .setIn('fetchAll.loading'.split('.'), false);
}

// 更新某个
reducer.prototype[actionType.channel.fetchSingleChannelPending] = (state, action) => {
    return state.set('fetchingSingle', true);
}
reducer.prototype[actionType.channel.fetchSingleChannelFulfilled] = (state, action) => {
    return state.set('fetchingSingle', false);
}
reducer.prototype[actionType.channel.fetchSingleChannelRejected] = (state, action) => {
    return state.set('fetchingSingle', false);
}

reducer.prototype[actionType.channel.setSingleChannelMenuVisble] = (state, action) => {
    return state.set('singleChannelMenuVisble', action.payload);
}


