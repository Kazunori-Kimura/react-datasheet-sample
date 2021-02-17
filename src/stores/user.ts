import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '../models/user';

export interface UserStore {
    current?: UserInfo;
}

const initialState: UserStore = {};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state: UserStore, action: PayloadAction<UserInfo>) => {
            return {
                ...state,
                current: action.payload,
            };
        },
        clearUserInfo: (state: UserStore) => {
            return {
                ...state,
                current: undefined,
            };
        },
    },
});

export const { setUserInfo, clearUserInfo } = slice.actions;
export default slice;
