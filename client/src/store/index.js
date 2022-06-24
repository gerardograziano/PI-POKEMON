import {applyMiddleware,  legacy_createStore as createStore} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';


import { composeWithDevTools } from '@redux-devtools/extension';

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(thunk)));
    //applyMiddleware(thunk));


export default store;