import { FirebaseError } from "firebase/app";
import { app } from "./app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, connectAuthEmulator, signInWithEmailAndPassword, setPersistence, signOut, sendPasswordResetEmail, onAuthStateChanged, browserLocalPersistence, UserCredential, signInWithRedirect, getRedirectResult, Auth, AuthError, User } from 'firebase/auth'
import { AppDispatch } from "app/providers/StoreProvider/config/store";
export const auth = getAuth(app);

if (__IS_DEV__) {
    connectAuthEmulator(auth, 'http://localhost:9009', { disableWarnings: true });
}

await setPersistence(auth, browserLocalPersistence);

export async function signUpEmailPassword(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(auth, email, password);
}

export async function loginEmailPassword(email: string, password: string) {
    try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        console.log('Signed in as:', cred.user.uid);
        return cred.user;
    } catch (e: any) {
        switch (e.code) {
            case 'auth/invalid-email':
                throw new Error('Некорректный email.');
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                throw new Error('Неверный email или пароль.');
            case 'auth/too-many-requests':
                throw new Error('Слишком много попыток. Попробуйте позже.');
            default:
                throw new Error(`Ошибка входа: ${e.message ?? e}`);
        }
    }
}

export async function logout(): Promise<void> {
    return await signOut(auth);
}
export async function resetPassword(email: string): Promise<void> {
    return await sendPasswordResetEmail(auth, email);
}

export function listenAuth(callback: (user: import('firebase/auth').User | null) => void) {
    return onAuthStateChanged(auth, callback);
}



const provider = new GoogleAuthProvider();
const redirAuth = getAuth()

export async function signInWithGoogle(redir: Auth = redirAuth) {
    try {
        await signInWithRedirect(auth, provider)
        const result = await getRedirectResult(auth)
        if (result) {
            const user = result.user
            console.log(user);
            localStorage.setItem('user', user.displayName || '123')

            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            return user
        }
    } catch (error) {
        if (error instanceof FirebaseError) {
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData?.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        }
    }
}
getRedirectResult(redirAuth)
interface AuthActions {
    setUser: (user: User) => any;
    clearUser: () => any;
}
export function initAuthListener(dispatch: AppDispatch, actions: AuthActions) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(actions.setUser(user))
        } else {
            dispatch(actions.clearUser())
        }
    });
}