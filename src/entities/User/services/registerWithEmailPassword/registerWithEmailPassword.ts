import { createAsyncThunk } from "@reduxjs/toolkit";
import { mapUserToDb } from "entities/User/lib/dbMapper";
import { ensureUserExists } from "features";
import { signUpEmailPassword } from "shared/config/firebase/auth";



export const registerWithEmailPassword = createAsyncThunk<void, { email: string, password: string }, { rejectValue: string }>(
    'user/registerWithEmailPassword',
    async ({ email, password }: { email: string, password: string }) => {
        const result = await signUpEmailPassword(email, password)
        const userDb = mapUserToDb(result.user)
        ensureUserExists(userDb)
    }
)