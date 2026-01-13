export interface Board {
    boardName: string | null,
    ownerId: string | null,
    members: string[] | null,
    createdAt: string | null,

}

export interface BoardSchema {
    data: Board | null
    isLoading: boolean
}