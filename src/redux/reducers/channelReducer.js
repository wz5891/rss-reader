import { actionType } from '../actions/actionType';
import { fromJS } from 'immutable';

function initialState() {
    return fromJS({
        channelModalVisble: false,
        channelList: [],
        currentChannelId: undefined,
        currentChannel: {},

        add: {
            doing: false,
            errorMsg: ''
        }
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

reducer.prototype[actionType.channel.setChannelList] = (state, action) => {
    return state.set('channelList', fromJS(action.payload));
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