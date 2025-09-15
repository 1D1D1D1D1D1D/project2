import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSchema } from "../types/types";
import { loginWithEmaiPassword } from "entities/User/services/loginWithEmaiPassword/loginWithEmaiPassword";
import { registerWithEmailPassword } from "entities/User/services/registerWithEmailPassword/registerWithEmailPassword";

const initialState: UserSchema = {
    user: {
        uid: '',
        displayName: null,
        email: null,
        photoURL: null,
        phoneNumber: '',
        providerId: ''
    },
    inited: false,
    isLoading: false,
    error: null

}

const userSlice = createSlice({
    name: 'userSlice',
    reducers: {
        setUser: (state, action: PayloadAction<UserSchema["user"]>) => {
            state.user = action.payload;
            state.inited = true;
            console.log(state.user);

        },
        clearUser: (state) => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
        }
    },
    initialState,
    extraReducers(builder) {

        builder.addCase(loginWithEmaiPassword.rejected, (state, action) => {
            state.isLoading = false
            state.inited = true
            if (action.payload) state.error = action.payload
        })
        builder.addCase(loginWithEmaiPassword.pending, (state, action) => {
            state.isLoading = true
            inited: false
        })
        builder.addCase(registerWithEmailPassword.rejected, (state, action) => {
            inited: false
            state.isLoading = false
            if (action.payload) state.error = action.payload
        })
        builder.addCase(registerWithEmailPassword.pending, (state, action) => {
            state.isLoading = true
            inited: false
        })


    }
})

export const { reducer: userReducer } = userSlice
export const { actions: userActions } = userSlice