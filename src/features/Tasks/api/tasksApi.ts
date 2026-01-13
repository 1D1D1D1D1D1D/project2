import { Task } from "entities/Task/model/types/types"
import { arrayUnion } from "firebase/firestore"
import { ImageMeta } from "shared/api/cloudinary"
import { updateDocById } from "shared/config/firebase/firestore"


export const addImageTask = async (taskId: string, image: ImageMeta) => {
   await updateDocById('tasks', taskId, {
      assets: arrayUnion(image)
   }
   )
}