import { combineReducers } from 'redux';
import setting from './settingReducer';
import channel from './channelReducer';
import item from './itemReducer';
import favorite from './favoriteReducer';

// if have a new reducer, add in to the list
export default combineReducers({
    setting,
    channel,
    item,
    favorite
})