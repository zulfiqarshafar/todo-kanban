import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    task: {},
    createOrEdit: null,
    isCreateEditOpen: false,
    isDeleteOpen: false,
    taskId: null,
    columnId: null
  },
  reducers: {
    toggleCreateEditModal: (state, action) => {
      state.task = action.payload.task;
      state.taskId = action.payload.task.id || null;
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