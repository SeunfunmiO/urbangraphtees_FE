
import { createSlice } from "@reduxjs/toolkit";

const loadSettings = () => {
  try {
    const saved = localStorage.getItem("settings");
    return saved ? JSON.parse(saved) : { name: "", email: "", darkMode: false };
  } catch (err) {
    console.log(err);
    return { name: "", email: "", darkMode: false } ; 
  }
};

const initialState = loadSettings();

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      localStorage.setItem("settings", JSON.stringify(state));
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("settings", JSON.stringify(state));
    },
    resetSettings: () => {
      const reset = { name: "", email: "", darkMode: false };
      localStorage.setItem("settings", JSON.stringify(reset));
      return reset;
    },
  },
});

export const { updateProfile, toggleDarkMode, resetSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
