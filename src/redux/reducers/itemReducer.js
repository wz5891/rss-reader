import { actionType } from '../actions/actionType';
import { fromJS } from 'immutable';

function initialState() {
    return fromJS({
        itemList: []
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