import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { mapUserToDb, User } from "entities/User";
import { getUserData } from "entities/User/model/selectors/selectors";
import { ensureUserExists } from "features";
import { signInWithGoogle, signInWithGooglePopup } from "shared/config/firebase/auth";
export const loginWithGoogle = createAsyncThunk<User | undefined, void, ThunkConfig<User>>(
    'user/loginWithGoogle',
    async (_, thunkAPI) => {
        const user = await signInWithGooglePopup();
        if (user) {

            const userDb = mapUserToDb(user)
            await ensureUserExists({
                ...userDb,
                emailVerified: true
            })
            return user;
        }
    }
)