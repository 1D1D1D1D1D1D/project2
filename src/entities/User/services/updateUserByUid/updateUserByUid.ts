// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
// import { mapUserToDb } from "entities/User/lib/dbMapper";
// import { getUserData } from "entities/User/model/selectors/selectors";
// import { userFields } from "entities/User/model/types/types";
// import { getUserByUid, updateUser } from "features";


// export const updateUserByUid = createAsyncThunk<void, void, ThunkConfig<string>>(
//     'user/updateUserByUid',
//     async (_, thunkAPI) => {
//         const { getState, rejectWithValue } = thunkAPI
//         const user = getUserData(getState())
//         try {
//             if (user && user.uid) {
//                 const userDb = await getUserByUid(user?.uid)
//                 const isDifferent = userDb
//                     ? userFields.some(key => user[key] !== userDb[key])
//                     : false
//                 if (!isDifferent) return
//                 const parsedUser = mapUserToDb(user)
//                 await updateUser(parsedUser, user.uid)
//             }
//             if (!user) {
//                 return;
//             }
//         } catch (error) {
//             return rejectWithValue('Failed to update user')
//         }

//     }


// )