import { User, UserDb } from "..";

export function mapUserToDb(u: User): UserDb {

    const { uid, email, displayName, photoURL, emailVerified } = u;
    return { uid, email, displayName, photoURL, emailVerified };
}