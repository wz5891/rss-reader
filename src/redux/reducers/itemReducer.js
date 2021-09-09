import { actionType } from '../actions/actionType';
import { fromJS } from 'immutable';

function initialState() {
    return fromJS({
        itemList: [],
        currentItemId: undefined,
        currentItem: {},
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

reducer.prototype[actionType.item.setItemList] = (state, action) => {
    return state.set('itemList', fromJS(action.payload));
}

reducer.prototype[actionType.item.setCurrentItemlId] = (state, action) => {
    return state.set('currentItemId', action.payload).set('currentItem', fromJS({}));
}

reducer.prototype[actionType.item.setCurrentItem] = (state, action) => {
    return state.set('currentItem', fromJS(action.payload));
}