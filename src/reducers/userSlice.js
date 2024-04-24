import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null
  },
  reducers: {
    setToken: (state,  action) => {
      localStorage.setItem('userToken', JSON.stringify(action.payload.token));
      state.token = action.payload.token;
    },
    getToken: () => {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) return undefined;
      return JSON.parse(userToken);
    },
  },
});

export default userSlice;