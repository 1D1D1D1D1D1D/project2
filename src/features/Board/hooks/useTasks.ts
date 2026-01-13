import { useQuery } from "@tanstack/react-query"
import { getTasks } from "../api/boardApi"

export const useTask = (boardId: string | null | undefined) => {
    return useQuery({
        queryKey: ['tasks', boardId],
        queryFn: () => getTasks(boardId as string),
        enabled: !!boardId,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false
    })
}