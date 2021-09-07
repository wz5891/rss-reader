import { actionType } from '../actions/actionType';
import { fromJS } from 'immutable';

function initialState() {
    return fromJS({
        lang: 'en',
        fontSize: 'normal',
        isNight: false
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

reducer.prototype[actionType.setting.setLanguage] = (state, action) => {
    return state.set('lang', action.payload);
}

reducer.prototype[actionType.setting.setIsNight] = (state, action) => {
    return state.set('isNight', action.payload);
}

reducer.prototype[actionType.setting.setFontSize] = (state, action) => {
    return state.set('fontSize', action.payload);
}