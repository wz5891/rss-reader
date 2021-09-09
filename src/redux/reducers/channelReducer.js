import { actionType } from '../actions/actionType';
import { fromJS } from 'immutable';

function initialState() {
    return fromJS({
        channelModalVisble: false,
        channelList: [],
        currentChannelId: undefined,
        currentChannel: {},
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