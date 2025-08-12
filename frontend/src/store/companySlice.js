import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    clearProfile(state) {
      state.profile = null;
    },
  },
});

export const { setProfile, clearProfile } = companySlice.actions;
export default companySlice.reducer;
