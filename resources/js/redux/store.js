import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import loggerMiddleware from 'redux-logger';
import { rootReducer } from './index';

export const store = configureStore({
    reducer: rootReducer,
    middleware: [loggerMiddleware, ...getDefaultMiddleware()],
});
