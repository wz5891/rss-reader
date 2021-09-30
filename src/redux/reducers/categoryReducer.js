import { actionType } from '../actions/actionType';
import { fromJS } from 'immutable';
import { act } from 'react-test-renderer';

function initialState() {
    return fromJS({
        list: {
            dataList: [],
            refreshing: false,
            loading: false,
            errorMsg: ''
        },

        currentCategory: {},

        addModalVisble: false,

        add: {
            doing: false,
            errorMsg: ''
        },
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

reducer.prototype[actionType.category.setCurrentCategory] = (state, action) => {
    let id = action.payload;

    let category = state.get('list').get('dataList').filter(data => data.get('id') == id).first();

    return state.set('currentCategory', fromJS(category));
}


reducer.prototype[actionType.category.setAddCategoryModalVisble] = (state, action) => {
    return state.set('addModalVisble', action.payload);
}



reducer.prototype[actionType.category.categoryAddPending] = (state, action) => {
    return state.setIn('add.doing'.split('.'), true)
        .setIn('add.errorMsg'.split('.'), '');
}

reducer.prototype[actionType.category.categoryAddFulfilled] = (state, action) => {
    return state.setIn('add.doing'.split('.'), false)
        .setIn('add.errorMsg'.split('.'), '')
        .updateIn('list.dataList'.split('.'), list => list.concat(fromJS([action.payload])));
}

reducer.prototype[actionType.category.categoryAddRejected] = (state, action) => {
    return state.setIn('add.doing'.split('.'), false)
        .setIn('add.errorMsg'.split('.'), action.payload);
}


// 查询
reducer.prototype[actionType.category.listPending] = (state, action) => {
    return state
        .setIn('list.loading'.split('.'), true)
        .setIn('list.errorMsg'.split('.'), '');
}

reducer.prototype[actionType.category.listFulfilled] = (state, action) => {
    return state
        .setIn('list.dataList'.split('.'), fromJS(action.payload))
        .setIn('list.loading'.split('.'), false)
        .setIn('list.errorMsg'.split('.'), '');
}

reducer.prototype[actionType.category.listRejected] = (state, action) => {
    return state
        .setIn('list.refreshing'.split('.'), false)
        .setIn('list.loading'.split('.'), false)
        .setIn('list.errorMsg'.split('.'), action.payload);
}

