import { useQuery } from "@tanstack/react-query"
import { getAllBoards } from ".."


export const useAllBoards = (uid: string | null | undefined) => {
    return useQuery({
        queryKey: ['boards', uid],
        queryFn: () => getAllBoards(uid as string),
        enabled: !!uid,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    })
}