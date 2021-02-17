import { combineReducers, configureStore, getDefaultMiddleware, Store } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import user from './user';

const rootResucer = combineReducers({
    user: user.reducer,
});

export type RootState = ReturnType<typeof rootResucer>;
export type ReduxStore = Store<RootState>;

const createStore = (): ReduxStore => {
    const middlewares = [...getDefaultMiddleware()];

    if (process.env.NODE_ENV === 'development') {
        middlewares.push(logger);
    }

    const store = configureStore({
        reducer: rootResucer,
        middleware: middlewares,
        devTools: process.env.NODE_ENV === 'development',
    });

    return store;
};

export default createStore;
