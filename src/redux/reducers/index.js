import { combineReducers } from 'redux';
import setting from './settingReducer';
import channel from './channelReducer';

// if have a new reducer, add in to the list
export default combineReducers({
    setting,
    channel
})