

export interface User {
  uid: string | null;
  providerId?: string;
  displayName: string | null;
  email: string | null;
  phoneNumber?: string | null;
  photoURL: string | null;

}

export interface UserSchema {
  inited?: boolean
  user: User | null,
  isLoading: boolean,
  error: string | null
}

