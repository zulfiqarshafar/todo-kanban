import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import createEditModalSlice from "./createEditModalSlice";
import taskSlice from "./taskSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    createEditModal: createEditModalSlice.reducer,
    task: taskSlice.reducer
  }
})

export default store