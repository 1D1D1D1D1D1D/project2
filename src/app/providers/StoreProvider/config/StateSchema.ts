import { CounterSchema } from "entities/Counter/ui/model/types/types";
import { UserSchema } from "entities/User/model/types/types";

export interface StateSchema {
    counter: CounterSchema;
    authData: UserSchema
}
