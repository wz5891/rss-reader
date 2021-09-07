import { combineReducers } from 'redux';
import setting from './settingReducer';

// if have a new reducer, add in to the list
export default combineReducers({
    setting,
})