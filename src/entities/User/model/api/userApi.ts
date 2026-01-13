import { User } from "entities/User";
import { api } from "shared/api/rtkApi";
import { auth } from "shared/config/firebase/auth";

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        updateUser: build.mutation<User, void>({
            async queryFn() {
                try {
                    await auth.currentUser?.reload();
                    const user = auth.currentUser;
                    if (!user) {
                        return { error: { message: "User is not authenticated" } };
                    }
                    return { data: user as User };
                } catch (error) {
                    return {
                        error: { message: String(error) }
                    };
                }
            },
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useUpdateUserMutation } = userApi