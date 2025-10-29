import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  role: "",
  experience: "",
  skills: [],
  location: "",
  linkedInUrl: "",
  githubUrl: "",
  whatsappNo: "",
  email: "",
  summary: "",
  aboutMe: ""
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      return action.payload;
    },
    updateProfileField: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    }
  }
});

export const { setProfile, updateProfileField } = profileSlice.actions;
export default profileSlice.reducer;
