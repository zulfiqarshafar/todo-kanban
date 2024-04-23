import { configureStore } from "@reduxjs/toolkit";
import createEditModalSlice from "./createEditModalSlice";

const store = configureStore({
  reducer: {
    createEditModal: createEditModalSlice.reducer,
  }
})

export default store