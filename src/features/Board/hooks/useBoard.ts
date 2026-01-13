import { useQuery } from "@tanstack/react-query"
import { getBoard } from "../api/boardApi"
import { Dispatch } from "@reduxjs/toolkit"


export const useBoard = (boardId: string | null | undefined, dispatch: Dispatch) => {
    return useQuery({
        queryKey: ['board', boardId],
        queryFn: () => getBoard(boardId as string, dispatch),
        enabled: !!boardId,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false
    })
}