import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { mapUserToDb } from "entities/User/lib/dbMapper";
import { ensureUserExists } from "features";
import { signUpEmailPassword } from "shared/config/firebase/auth";



export const registerWithEmailPassword = createAsyncThunk<void, { email: string, password: string }, ThunkConfig<string>>(
    'user/registerWithEmailPassword',
    async ({ email, password }: { email: string, password: string }, thunkApi) => {
        const { dispatch } = thunkApi
        const result = await signUpEmailPassword(email, password)
        const userDb = mapUserToDb(result.user)
        ensureUserExists(userDb)
    }
)