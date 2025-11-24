import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { counterReducer } from "entities/Counter/ui/model/slice/counterSlice";
import { StateSchema, ThunkExtraArg, userApi } from "./StateSchema";
import { userReducer } from "entities/User/model/slice/userSlice";
import { ensureUserExists, getUserByUid } from "features/User/api/firestore";



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
            authData: userReducer

        },
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
            thunk: {
                extraArgument: extraArg
            }
        }),
    })
    return configuredStore;
}