import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserByUid } from "../api/userApi"

export const useUser = (uid: string) => {
    return useQuery({
        queryKey: ['user', uid],
        queryFn: () => getUserByUid(uid),
        enabled: !!uid,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false
    })
}