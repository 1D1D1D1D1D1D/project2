import { useQuery } from "@tanstack/react-query"
import { getColumns } from "../api/boardApi"

export const useColumns = (boardId: string | null | undefined) => {
    return useQuery({
        queryKey: ['columns', boardId],
        queryFn: () => getColumns(boardId as string),
        enabled: !!boardId,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false
    })
}