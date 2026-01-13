import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { loginWithEmaiPassword, loginWithGoogle, registerWithEmailPassword, userApi, UserSchema } from "entities/User";

const initialState: UserSchema = {
    user: {
        uid: '',
        displayName: null,
        email: null,
        photoURL: '',
        emailVerified: false
    },
    isLoading: true,
    error: null
}

const userSlice = createSlice({
    name: 'userSlice',
    reducers: {
        setUser: (state, action: PayloadAction<UserSchema["user"]>) => {
            if (action?.payload) {
                state.user = {
                    ...state.user,
                    ...action.payload,
                    photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',

                };
                state.isLoading = false
            }
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
            if (action.payload) state.error = action.payload
        })
        builder.addCase(loginWithEmaiPassword.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(loginWithEmaiPassword.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(registerWithEmailPassword.rejected, (state, action) => {
            state.isLoading = false
            if (action.payload) state.error = action.payload
        })
        builder.addCase(registerWithEmailPassword.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(registerWithEmailPassword.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(loginWithGoogle.rejected, (state, action) => {
            state.isLoading = false
            // if (action.payload) state.error = action.payload
        })
        builder.addCase(loginWithGoogle.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
            state.isLoading = false
            // state.user = action.payload
            // console.log(action.payload);

        }),
            builder.addMatcher(userApi.endpoints.updateUser.matchPending, (state, action) => {
                state.isLoading = true
            })
        builder.addMatcher(userApi.endpoints.updateUser.matchFulfilled, (state, action) => {
            state.isLoading = false
            state.user = {
                ...state.user,
                ...action.payload
            }
        })
        builder.addMatcher(userApi.endpoints.updateUser.matchRejected, (state, action) => {
            state.isLoading = false,
                state.error = action.error.message ?? 'unknown error'
        })


    }
})

export const { reducer: userReducer } = userSlice
export const { actions: userActions } = userSlice