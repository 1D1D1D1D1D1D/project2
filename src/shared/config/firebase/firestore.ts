import { doc, DocumentData, getFirestore, setDoc, WithFieldValue, addDoc, collection, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { app } from "./app";

export const db = getFirestore(app);

//  uid: string | null;
//   providerId?: string;
//   displayName: string | null;
//   email: string | null;
//   phoneNumber?: string | null;
//   photoURL: string | null;
export const createDoc = async <T extends WithFieldValue<DocumentData>>(collectionName: string, id: string, data: T) => {
    console.log(collectionName, id, data);

    await setDoc(doc(db, collectionName, id), data)
}
// auto-generate an ID
export const addDocAuto = async <T extends WithFieldValue<DocumentData>>(collectionName: string, data: T) => {
    await addDoc(collection(db, collectionName), data)
}

export const firestoreRef = (collectionName: string, id: string) => {
    return doc(db, collectionName, id)
}
export const updateDocById = async <T extends WithFieldValue<DocumentData>>(collectionName: string, id: string, data: T) => {
    const ref = firestoreRef(collectionName, id)
    await updateDoc(ref, {
        ...data
    })
}

export const getDocById = async <T>(collectionName: string, id: string): Promise<T | undefined> => {
    const ref = firestoreRef(collectionName, id)
    const docSnap = await getDoc(ref);
    return docSnap.data() as T
}

export const getDocsAll = async <T>(collectionName: string): Promise<(T & { id: string })[]> => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as T
    }))
    return documents
}

