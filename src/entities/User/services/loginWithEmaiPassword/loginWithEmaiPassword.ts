import { createAsyncThunk } from "@reduxjs/toolkit";

import { loginEmailPassword } from "shared/config/firebase/auth";



export const loginWithEmaiPassword = createAsyncThunk<void, { email: string, password: string }, { rejectValue: string }>(
    'user/loginWithEmaiPassword',
    async ({ email, password }: { email: string, password: string }) => {
        const UserCredential = await loginEmailPassword(email, password)
    }
)