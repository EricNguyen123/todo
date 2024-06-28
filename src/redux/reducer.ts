import { TypedUseSelectorHook, useSelector as rawUseSelector } from 'react-redux';
import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import weatherReducer from './weather/reducer';
import todoReducer from './todo/reducer';

import storage from 'redux-persist/es/storage';
import persistReducer from 'redux-persist/es/persistReducer';

const rootPersistConfig = {
    key: 'root',
    storage,
    blacklist: [
        'auth',
        'weather',
        'todo',
    ],
};

const authPersistConfig = {
    key: 'auth',
    storage,
    blacklist: ['loading'],
};

const reducers = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    weather: weatherReducer,
    todo: todoReducer,
});

type RootState = ReturnType<typeof reducers>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

const rootReducer = (state: any, action: any) => {
    return reducers(state, action);
};

export default persistReducer(rootPersistConfig, persistReducer(rootPersistConfig, rootReducer));
