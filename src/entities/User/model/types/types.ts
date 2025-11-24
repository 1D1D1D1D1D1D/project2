

export interface User {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  emailVerified: boolean
}


export interface UserSchema {
  user: User | null,
  isLoading: boolean,
  error: string | null
}

export type UserDb = Pick<User, 'uid' | 'displayName' | 'email' | 'photoURL' | 'emailVerified'>

export const userFields: (keyof User)[] = ["uid", "displayName", "email", "photoURL", "emailVerified"]