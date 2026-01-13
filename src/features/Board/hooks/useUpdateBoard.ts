import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBoard } from "../api/boardApi"
import { Board } from "entities/Board"
type UpdateBoardVariables = {
    id: string;
    data: Partial<Board>;
};

export const useUpdateBoard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: UpdateBoardVariables) => {
            if (!data || !id) {
                throw new Error("no data");
            }
            await updateBoard(id, data)

        },
        onMutate: async ({ id, data }) => {
            await queryClient.cancelQueries({ queryKey: ['board', id] })
            const prev = queryClient.getQueryData<Board>(['board', id])
            if (prev && data) {
                queryClient.setQueryData<Board>(['board', id], (old) => {
                    if (!old) return undefined
                    return {
                        ...old,
                        ...data,
                        boardName: data.boardName ?? old.boardName
                    }
                })
                return { prev, id }
            }

        },
        onError: (_, __, context) => {
            if (context?.prev && context.id) {
                queryClient.setQueryData(['data', context.id], context.prev)
            }
        }
    })
}