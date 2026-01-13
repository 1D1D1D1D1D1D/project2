import { getUserData, mapUserToDb } from "entities/User";
import { User, UserDb, userFields } from "entities/User/model/types/types"
import { useSelector } from "react-redux";
import { createDoc, getDocById, updateDocById } from "shared/config/firebase/firestore"

export const getUserByUid = (uid: string, prevEtag?: string): Promise<User | undefined> => {
    const user = getDocById<User>('users', uid);
    return user
};

export const ensureUserExists = async (user: UserDb): Promise<void> => {
    if (!user.uid) {
        return
    };
    console.log(user);
    const docSnap = await getDocById<User>('users', user.uid);

    if (!docSnap) {
        await createDoc<UserDb>('users', user.uid, user)
    }
}
export const updateUser = async (user: UserDb, uid: string): Promise<void> => {
    updateDocById('users', uid, user)
}
export const ensureUserUpdated = async (user: UserDb): Promise<void> => {
    if (user && user.uid) {
        const userDb = await getUserByUid(user?.uid)
        const isDifferent = userDb
            ? userFields.some(key => user[key] !== userDb[key])
            : false
        if (!isDifferent) return
        const parsedUser = mapUserToDb(user)
        await updateUser(parsedUser, user?.uid)
    }
}