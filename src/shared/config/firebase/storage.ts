import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./app"

const storageRef = ref(storage)
export const uploadImage = (file: File) => {
    uploadBytes(storageRef, file)
    // getDownloadURL(storageRef)
}
