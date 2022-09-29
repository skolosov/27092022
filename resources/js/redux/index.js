import { combineReducers } from 'redux';
import { general } from './generalSlice';

export const rootReducer = combineReducers({
    general,
});
