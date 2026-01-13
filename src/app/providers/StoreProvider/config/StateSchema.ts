import { BoardSchema } from "entities/Board";
import { CounterSchema } from "entities/Counter/ui/model/types/types";
import { User, UserSchema } from "entities/User";
import { useNavigate } from "react-router-dom";

export interface StateSchema {
    counter: CounterSchema;
    authData: UserSchema
    board: BoardSchema
}

export interface userApi {
    ensureUserExists(user: User): Promise<void>;
    getUserByUid(uid: string): Promise<User | undefined>
}

export interface ThunkExtraArg {
    api: {
        user: userApi
    }
}
export interface ThunkConfig<T> {
    rejectValue: T,
    extra: ThunkExtraArg;
    state: StateSchema;
    navigate?: ReturnType<typeof useNavigate>,
}
