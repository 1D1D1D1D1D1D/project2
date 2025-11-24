import { useCallback } from "react"
import { useUpdateUser, useUser } from "features"
import { User, UserDb, userFields } from "entities/User"
export const useEnsureUserUpdated = (uid: string | null) => {

    const { data: userDb, isLoading } = useUser(uid ?? '')
    const updateMutation = useUpdateUser()

    const ensureUpdated = useCallback((user: UserDb | null) => {
        if (!user) {
            return
        }
        if (!userDb && !isLoading) {
            updateMutation.mutate(user)
            return
        }
        if (userDb && !isLoading) {
            const isDifferent = userFields.some(key => user[key] !== userDb[key])
            if (isDifferent) {
                updateMutation.mutate(user)
            }
        }
    }, [userDb, isLoading, updateMutation])
    return { ensureUpdated, isLoading: updateMutation.isPending };

}