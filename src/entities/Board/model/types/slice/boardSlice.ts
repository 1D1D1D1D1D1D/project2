import { createSlice } from "@reduxjs/toolkit";
import { BoardSchema } from "../types";

const initialState: BoardSchema = {
    data: null,
    isLoading: false
}
export const boardSlice = createSlice({
    name: 'boardSlice',
    initialState,
    reducers: {
        setBoard: (state, action) => {
            state.data = {
                ...state.data,
                ...action.payload
            }
        }
    }
})

export const { reducer: boardReducer } = boardSlice
export const { actions: boardActions } = boardSlice