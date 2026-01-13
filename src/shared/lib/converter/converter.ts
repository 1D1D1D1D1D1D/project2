import { FirestoreDataConverter, DocumentData, SnapshotOptions } from 'firebase/firestore';

export const withIdConverter = <T>(): FirestoreDataConverter<T & { id: string }> => ({
    toFirestore: (data: T & { id: string }): DocumentData => {
        const { id, ...withoutId } = data;
        return withoutId;
    },
    fromFirestore: (snapshot: any, options?: SnapshotOptions) => {
        const data = snapshot.data(options);
        return { ...data, id: snapshot.id } as T & { id: string };
    },
});