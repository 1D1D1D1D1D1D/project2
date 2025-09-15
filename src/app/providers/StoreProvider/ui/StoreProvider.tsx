import { ReactNode } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";
import { StateSchema } from "../config/StateSchema";
import { ReducersMapObject } from "@reduxjs/toolkit";
import { DeepPartial } from "shared/lib/DeepPartial/DeepPartial";


interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState, asyncReducers } = props
    const store = createReduxStore(
        asyncReducers as DeepPartial<ReducersMapObject<StateSchema>>,
        initialState as StateSchema
    )
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};