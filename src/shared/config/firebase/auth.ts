import { FirebaseError } from "firebase/app";
import { app } from "./app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, connectAuthEmulator, signInWithEmailAndPassword, setPersistence, signOut, sendPasswordResetEmail, onAuthStateChanged, browserLocalPersistence, UserCredential, signInWithRedirect, getRedirectResult, Auth, AuthError, User, sendSignInLinkToEmail, ActionCodeSettings, signInWithPopup, sendEmailVerification, applyActionCode, checkActionCode, ActionCodeInfo } from 'firebase/auth'
export const auth = getAuth(app);
const user = auth.currentUser;
console.log(user);
const AUTH_ACTIONS = {
    EMAIL_VERIFY: "verifyEmail",
    RECOVER_EMAIL: "recoverEmail",
    RESET_PASSWORD: "resetPassword",
} as const;
type AuthAction = typeof AUTH_ACTIONS[keyof typeof AUTH_ACTIONS];

// if (__IS_DEV__) {
//     connectAuthEmulator(auth, 'http://localhost:9009', { disableWarnings: true });
// }


// export function initAuthListener(dispatch: AppDispatch, actions: AuthActions) {
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//             const formattedUser = {
//                 uid: user.uid || '',
//                 displayName: user.displayName,
//                 email: user.email,
//                 photoURL: user.photoURL || '',
//                 phoneNumber: user.phoneNumber || '',
//                 emailVerified: user.emailVerified || false,
//                 providerId: user.providerId || ''
//             } as User

//             dispatch(actions.setUser(formattedUser))
//             console.log(auth.currentUser);

//         }
//         else {
//             dispatch(actions.clearUser())
//         }
//     });
// }
export function initAuthListener(options: {
    onSignedIn: (u: User) => void
    onSignedOut: () => void
    onVerified?: (u: User) => void
}) {
    return onAuthStateChanged(auth, (user) => {
        if (user) {

            const formattedUser = {
                uid: user.uid || '',
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL || '',
                phoneNumber: user.phoneNumber || '',
                emailVerified: user.emailVerified || false,
                providerId: user.providerId || ''
            } as User
            options.onSignedIn(formattedUser)
            if (user.emailVerified) {
                options.onVerified?.(formattedUser)
            }
        }
        else {
            options.onSignedOut()
        }
    });

}
setPersistence(auth, browserLocalPersistence).catch(error => {
    console.error('Persistence  error', error);
})

export async function signUpEmailPassword(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(auth, email, password);
}

export async function loginEmailPassword(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
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
    ; (window as any).auth = auth
export async function initGoogleRedirect() {
    try {
        const result = await getRedirectResult(auth)
        if (result) {
            const user = result.user
            console.log(user);
            return user
        }
    } catch (error) {
        if (error instanceof FirebaseError) {
            console.log(error.code, error.message);

        }
    }
    return null
}

export async function signInWithGoogle() {
    try {
        await signInWithRedirect(auth, provider)
    } catch (error) {
        if (error instanceof FirebaseError) {
            console.error('Sign in with Google error:', error.code, error.message);
            throw error;
        }
    }
}

export async function signInWithGooglePopup() {
    try {
        const result = await signInWithPopup(auth, provider)
        return result.user
    } catch (error) {
        if (error instanceof FirebaseError) {
            console.error('Sign in with Google error:', error.code, error.message);
            throw error;
        }
    }
}


// export async function signInWithGoogle(redir: Auth = redirAuth) {
//     try {
//         await signInWithRedirect(auth, provider)
//         const result = await getRedirectResult(auth)
//         if (result) {
//             const user = result.user
//             console.log(user);
//             return user
//         }

//     } catch (error) {
//         if (error instanceof FirebaseError) {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             const email = error.customData?.email;
//             const credential = GoogleAuthProvider.credentialFromError(error);
//         }
//     }
// }


export async function sendEmailVerify<User>(user: User) {
    try {
        if (auth.currentUser)
            await sendEmailVerification(auth.currentUser)
    } catch (error) {
        if (error instanceof FirebaseError) {
            console.error('Email verify error:', error.code, error.message);
            throw error;
        }
    }
}
// export async function sendLinkToEmail<T extends FormValues>(values: T, actionCodeSettings: ActionCodeSettings) {
//     try {
//         const email = values.email
//         console.log(email);

//         await sendSignInLinkToEmail(auth, email, actionCodeSettings)
//     } catch (error) {
//         if (error instanceof FirebaseError) {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//         }
//     }

// }

async function handleVerifyEmail(actionCode: string): Promise<void> {
    await applyActionCode(auth, actionCode)
}
export async function handleCheckActionCode(actionCode: string): Promise<void> {
    await checkActionCode(auth, actionCode)
}
export async function handleAuthAction(mode: AuthAction, actionCode: string) {
    switch (mode) {
        case "verifyEmail":
            await handleVerifyEmail(actionCode)
            break;
        case "recoverEmail":
            console.log('recover email');
            break;
        case "resetPassword":
            console.log('reset Password');
            break;
    }
}

