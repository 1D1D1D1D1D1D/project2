import { mapUserToDb } from "./lib/dbMapper";
import { getUserData, getUserIsLoading } from "./model/selectors/selectors";
import { loginWithEmaiPassword } from "./services/loginWithEmaiPassword/loginWithEmaiPassword";
import { loginWithGoogle } from "./services/loginWithGoogle/loginWithGoogle";
import { registerWithEmailPassword } from "./services/registerWithEmailPassword/registerWithEmailPassword";
import { User, UserDb, UserSchema, userFields } from "./model/types/types";

export {
    getUserData,
    getUserIsLoading,
    loginWithGoogle,
    registerWithEmailPassword,
    loginWithEmaiPassword,
    mapUserToDb,
    // updateUserByUid,
    userFields,
    type User,
    type UserDb,
    type UserSchema

}