import { createSlice } from "@reduxjs/toolkit";

const createEditModalSlice = createSlice({
  name: "createEditModal",
  initialState: {
    createOrEdit: null,
    isOpen: false,
    columnId: null
  },
  reducers: {
    toggleModal: (state, action) => {
      state.createOrEdit = action.payload.createOrEdit;
      state.isOpen = !state.isOpen;
      state.columnId = action.payload.columnId;
    },
  },
});

export default createEditModalSlice;