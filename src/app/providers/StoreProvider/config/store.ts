import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { counterReducer } from "entities/Counter/ui/model/slice/counterSlice";
import { StateSchema, ThunkExtraArg } from "./StateSchema";
import { userReducer } from "entities/User/model/slice/userSlice";
import { ensureUserExists, getUserByUid } from "features/User/api/userApi";
import { api } from "shared/api/rtkApi";
import { boardReducer } from "entities/Board/model/types/slice/boardSlice";


export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']

export function createReduxStore(reducers: ReducersMapObject, initialState: StateSchema) {

    const extraArg: ThunkExtraArg = {
        api: {
            user: { ensureUserExists, getUserByUid },
        }
    };
    const configuredStore = configureStore({
        reducer: {
            counter: counterReducer,
            authData: userReducer,
            board: boardReducer,
            [api.reducerPath]: api.reducer,

        },
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
            thunk: {
                extraArgument: extraArg
            }
        }).concat(api.middleware),
    })
    return configuredStore;
}