import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DocumentData, DocumentSnapshot, onSnapshot, Query, QueryConstraint, QuerySnapshot } from "firebase/firestore";
import { useEffect, useMemo, useRef, useState } from "react";
import { firestoreRef, q } from "shared/config/firebase/firestore";
interface useSnapshotQueryProps<T> {
    ref: 'document' | 'query'
    queryKey: string[],
    collectionName: string,
    constraints?: QueryConstraint[]
    id?: string
}
type DocumentResult<T> = (T & { id: string })
type QueryResult<T> = (T & { id: string })[]
type SnapshotResult<T, R extends 'document' | 'query'> =
    R extends 'document' ? DocumentResult<T> :
    R extends 'query' ? QueryResult<T> :
    never


export const useSnapshotQuery = <T extends DocumentData, R extends 'document' | 'query'>(props: useSnapshotQueryProps<T>) => {
    const { queryKey, ref, collectionName, constraints, id } = props
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    type Result = SnapshotResult<T, R>
    const resolveRef = useRef<
        (data: Result) => void
    >(null);


    const isEnabled =
        (
            (ref === 'query' && !!constraints?.length) ||
            (ref === 'document' && !!id)
        )
    const dataPromise = useMemo(() => {
        return new Promise<Result>((resolve) => {
            resolveRef.current = resolve
        })
    }, [queryKey])
    const handleSnapshot = (snapshot: QuerySnapshot<T & { id: string }> | DocumentSnapshot<T & { id: string }>) => {
        let data: Result
        if (snapshot instanceof QuerySnapshot) {
            data = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id

            })) as SnapshotResult<T, R>
            setIsLoading(false)
        } else {
            data = {
                id: snapshot.id,
                ...snapshot.data() as SnapshotResult<T, R>,
            }
        }
        if (resolveRef.current) {
            resolveRef.current(data)
        }
        queryClient.setQueryData(queryKey, data)


    }
    useEffect(() => {
        if (!isEnabled) return
        if (ref == 'query' && constraints && isLoading === false) {
            const queryRef = q(collectionName, ...constraints)
            const unsubscribe = onSnapshot(queryRef, (snapshot) => {
                handleSnapshot(snapshot as QuerySnapshot<T & { id: string }>)
            })
            setIsLoading(true)

            return unsubscribe;
        } else {
            if (ref == 'document' && id) {
                const ref = firestoreRef(collectionName, id)
                const unsubscribe = onSnapshot(ref, (snapshot) => {
                    handleSnapshot(snapshot as DocumentSnapshot<T & { id: string }>)
                })
                return unsubscribe
            }
        }

    }, [ref, isEnabled, id, collectionName, constraints]);

    return useQuery({
        queryKey,
        queryFn: () => dataPromise,
        enabled: isEnabled,

    })
}