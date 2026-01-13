import { doc, DocumentData, getFirestore, setDoc, WithFieldValue, addDoc, collection, updateDoc, getDoc, getDocs, onSnapshot, query, where, QueryFieldFilterConstraint, orderBy, QueryOrderByConstraint, limit, QueryLimitConstraint, QueryConstraint, QueryConstraintType, Query } from "firebase/firestore";
import { app } from "./app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Unsubscribe } from "firebase/auth";
import { queryOptions } from "@tanstack/react-query";
import { data } from "react-router-dom";
const QueryOperators = {
  LESS_THAN: '<',
  LESS_THAN_OR_EQUAL_TO: '<=',
  EQUAL_TO: '==',
  GREATER_THEN: '>',
  GREATER_THEN_OR_EQUAL_TO: '>=',
  NOT_EQUAL_TO: '!=',
  ARRAY_CONTAINS: 'array-contains',
  ARRAY_CONTAINS_ANY: 'array-contains-any',
  IN: 'in',
  NOT_IN: 'not-in'

} as const

export const db = getFirestore(app);

export const createDoc = async <T extends WithFieldValue<DocumentData>>(collectionName: string, id: string, data: T) => {
  return await setDoc(firestoreRef(collectionName, id), data)

}

// auto-generate an ID
export const addDocAuto = async <T extends WithFieldValue<DocumentData>>(collectionName: string, data: T) => {
  const ref = await addDoc(collection(db, collectionName), data)
  console.log(data);

  return ref.id
}

export const firestoreRef = (collectionName: string, id: string) => {
  return doc(db, collectionName, id)
}
export const updateDocById = async <T extends WithFieldValue<DocumentData>>(collectionName: string, id: string, data: T) => {
  const ref = firestoreRef(collectionName, id)
  await updateDoc(ref, {
    ...data as T
  })
}

export const getDocById = async <T>(collectionName: string, id: string): Promise<T | undefined> => {
  const ref = firestoreRef(collectionName, id)
  const docSnap = await getDoc(ref);
  return {
    id: docSnap.id,
    ...docSnap.data() as T
  }
}
// type GetByCollection = {
//   mode: 'collection'
//   collectionName: string
// }

// export type GetByQuery = {
//   mode: 'query'
//   query: Query<DocumentData, DocumentData>
// }

// type GetDocsParams = GetByQuery | GetByCollection

// export const getDocsAll = <T>(
//   params: GetDocsParams
// ): void => {
//   'query' in params
//     ? getDocsByQuery<T>(params.query)
//     : getDocsByCollection<T>(params.collectionName)
// }
export const getDocsByQuery = async <T>(query: Query<DocumentData, DocumentData>): Promise<(T & { id: string })[]> => {
  const querySnapshot = await getDocs(query)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as T
  }))
}
export const getDocsByCollection = async <T>(collectionName: string): Promise<(T & { id: string })[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName))
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as T
  }))
}
export const collectionRef = (collectionName: string) => {
  const ref = collection(db, collectionName)
  return ref
}
export const q = (collectionName: string, ...constraints: QueryConstraint[]) => {
  return query(collectionRef(collectionName), ...constraints);
};
export const listenByQuery = <T>(collectionName: string,
  //  callback?: (data: T[]) => void, 
  ...constraints: QueryConstraint[]) => {
  return onSnapshot(q(collectionName, ...constraints), (snapshot) => {
    snapshot.docs.map(d => ({
      id: d.id, ...d.data() as T
    }))

    // if (callback)
    // callback(data)
  })
}

export const listen = <T>(collectionName: string, id: string) => {
  const ref = firestoreRef(collectionName, id)
  const unsub = onSnapshot(ref, (snapshot) => {
    snapshot.data(),
      snapshot.id
  })
  return unsub
}

