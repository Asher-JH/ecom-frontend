import {combineReducers} from 'redux';
import authReducer from './auth';
import itemReducer from './items';
import cartReducer from './cart';

const rootReducer = combineReducers({
    auth: authReducer,
    items: itemReducer,
    cart: cartReducer
});

export default rootReducer;