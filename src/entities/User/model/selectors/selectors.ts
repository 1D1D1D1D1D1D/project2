import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";


export const getUserData = (state: StateSchema) => state.authData.user
export const getUserUid = (state: StateSchema) => state.authData.user?.uid
export const getUserIsLoading = (state: StateSchema) => state.authData.isLoading