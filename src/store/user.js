import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userCity: "",
};

const userSlice = createSlice({
  name: "userInput",
  initialState,
  reducers: {
    handleName(state, action) {
      state.userName = action.payload;
    },
    handleCity(state, action) {
      state.userCity = action.payload;
    },
  },
});
export const userAction = userSlice.actions;
export default userSlice.reducer;
