import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPersonalInfo, updatePersonalInfo } from './personalInfoAPI';

export const getPersonalInfo = createAsyncThunk(
  'personalInfo/fetchPersonalInfo',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchPersonalInfo();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while fetching personal information.");
    }
  }
);

export const putNewPersonalInfo = createAsyncThunk(
  'personalInfo/updatePersonalInfo',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const updatedData = await updatePersonalInfo(id, data);
      return updatedData;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while updating personal information.");
    }
  }
);
