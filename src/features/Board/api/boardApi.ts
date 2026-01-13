import { Dispatch } from "@reduxjs/toolkit"
import { Board } from "entities/Board"
import { boardActions } from "entities/Board/model/types/slice/boardSlice"
import { Column } from "entities/Column/model/types/types"
import { Task } from "entities/Task/model/types/types"
import { where } from "firebase/firestore"
import { getDocsByQuery, listen, listenByQuery, q, updateDocById } from "shared/config/firebase/firestore"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { persister } from "shared/lib/queryClientPersister/queryClientPersister"


export const getAllBoards = (uid: string) => {
  const query = q('boards', ...[where('ownerId', '==', uid)])
  return getDocsByQuery<Board>(query)
}
export const getBoard = (boardId: string, dispatch: Dispatch) => {
  listen<Board>('boards', boardId,)
}

export const getColumns = (boardId: string) => {
  const query = q('boards', ...[where('boardId', '==', boardId)])
  return getDocsByQuery<Column>(query)
}
export const getTasks = (boardId: string) => {
  const query = q('tasks', ...[where('boardId', '==', boardId)])
  return getDocsByQuery<Task>(query)
}
export const updateBoard = (id: string, data: Partial<Board>) => {
  return updateDocById('boards', id, data)
}
