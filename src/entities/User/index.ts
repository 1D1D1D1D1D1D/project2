import { mapUserToDb } from "./lib/dbMapper";
import { getUserData, getUserIsLoading, getUserUid } from "./model/selectors/selectors";
import { loginWithEmaiPassword } from "./services/loginWithEmaiPassword/loginWithEmaiPassword";
import { loginWithGoogle } from "./services/loginWithGoogle/loginWithGoogle";
import { registerWithEmailPassword } from "./services/registerWithEmailPassword/registerWithEmailPassword";
import { User, UserDb, UserSchema, userFields } from "./model/types/types";
import { userApi, useUpdateUserMutation } from "./model/api/userApi";

export {
    getUserData,
    getUserIsLoading,
    getUserUid,
    loginWithGoogle,
    registerWithEmailPassword,
    loginWithEmaiPassword,
    mapUserToDb,
    // updateUserByUid,
    userFields,
    type User,
    type UserDb,
    type UserSchema,
    useUpdateUserMutation, userApi

}