import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "entities/User/model/types/types";
import { signUpEmailPassword } from "shared/config/firebase/auth";



export const registerWithEmailPassword = createAsyncThunk<void, { email: string, password: string }, { rejectValue: string }>(
    'user/registerWithEmailPassword',
    async ({ email, password }: { email: string, password: string }) => {
        const UserCredential = await signUpEmailPassword(email, password)
    }
)