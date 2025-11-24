

import { QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { ReactNode } from 'react';
import { queryClient, persister } from 'shared/lib/queryClientPersister/queryClientPersister';

interface QueryProviderProps {
    children: ReactNode;
}
persistQueryClient({
    queryClient,
    persister,
    maxAge: 1000 * 60 * 60 * 24,
})


export const QueryProvider = ({ children }: QueryProviderProps) => {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};