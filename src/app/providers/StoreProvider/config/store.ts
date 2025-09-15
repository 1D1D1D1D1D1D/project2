import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { counterReducer } from "entities/Counter/ui/model/slice/counterSlice";
import { StateSchema } from "./StateSchema";
import { userReducer } from "entities/User/model/slice/userSlice";




export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']

export function createReduxStore(reducers: ReducersMapObject, initialState: StateSchema) {


    const configuredStore = configureStore({
        reducer: {
            counter: counterReducer,
            authData: userReducer

        },
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    })
    return configuredStore;
}