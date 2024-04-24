import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    createOrEdit: null,
    isCreateEditOpen: false,
    isDeleteOpen: false,
    taskId: null,
    columnId: null
  },
  reducers: {
    toggleCreateEditModal: (state, action) => {
      state.createOrEdit = action.payload.createOrEdit;
      state.isCreateEditOpen = !state.isCreateEditOpen;
      state.columnId = action.payload.columnId;
    },
    toggleDeleteModal: (state, action) => {
      state.isDeleteOpen = !state.isDeleteOpen;
      state.taskId = action.payload.taskId;
      state.columnId = action.payload.columnId;
    },
  },
});

export default modalSlice;