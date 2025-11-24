import { QueryClient } from '@tanstack/react-query'
import { Persister, PersistedClient } from '@tanstack/react-query-persist-client'
import localforage from 'localforage'


export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        },
    },
})

const PERSIST_KEY = 'react-query'
export const persister = {
    persistClient: async (client: PersistedClient) => {
        await localforage.setItem(PERSIST_KEY, client)
    },
    restoreClient: async () => {
        return (await localforage.getItem(PERSIST_KEY)) as PersistedClient | undefined
    },
    removeClient: async () => {
        await localforage.removeItem(PERSIST_KEY)
    },
} satisfies Persister




// interface Persister {
//     persistClient: (persistClient: PersistedClient) => Promisable<void>;
//     restoreClient: () => Promisable<PersistedClient | undefined>;
//     removeClient: () => Promisable<void>;
// }

// export function createIDBPersister(idbValidKey: IDBValidKey = 'reactQuery') {
//   return {
//     persistClient: async (client: PersistedClient) => {
//       await set(idbValidKey, client)
//     },
//     restoreClient: async () => {
//       return await get<PersistedClient>(idbValidKey)
//     },
//     removeClient: async () => {
//       await del(idbValidKey)
//     },
//   } satisfies Persister
// }