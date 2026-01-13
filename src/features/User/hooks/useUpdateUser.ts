import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ensureUserUpdated, updateUser } from "../api/userApi"
import { mapUserToDb, UserDb } from "entities/User"
import { data } from "react-router-dom"


export const useUpdateUser = () => {
    const queryClient = useQueryClient()

    return useMutation(
        {
            mutationFn: async (user: UserDb) => {
                if (!user.uid) {
                    throw new Error("no uid");
                }
                const parsedUser = mapUserToDb(user)
                return await updateUser(parsedUser, user.uid)
            },
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries({ queryKey: ['user', variables.uid] })
            },
        }

    )
}