import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers';

const middleware = __DEV__ ?
    composeWithDevTools(applyMiddleware(promise, thunk, createLogger()))
    :
    applyMiddleware(promise, thunk);

export default createStore(reducer, middleware)