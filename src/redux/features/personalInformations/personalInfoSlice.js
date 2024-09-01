import { createSlice } from "@reduxjs/toolkit";
import { getPersonalInfo ,putNewPersonalInfo} from "./personalInfoThunk";

const initialState = {
  info: null, 
  status: "idle", // حالة جلب المعلومات
  updateStatus: "idle", // حالة التحديث
  error: null, 
};

const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPersonalInfo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getPersonalInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.info = action.payload;
      })
      .addCase(getPersonalInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An error occurred while fetching personal information.";
      })
      .addCase(putNewPersonalInfo.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(putNewPersonalInfo.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.info = action.payload;
      })
      .addCase(putNewPersonalInfo.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload || "An error occurred while updating personal information.";
      });
  },
});

export default personalInfoSlice.reducer;
