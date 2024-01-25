import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    deleteUser: state => {
      return {
        ...state,
        user: null,
      };
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
