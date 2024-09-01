import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTexts ,UpdateTexts } from './textsAPI';

export const getTexts = createAsyncThunk('texts/fetchTexts', async (_, { rejectWithValue }) => {
    try {
        const data = await fetchTexts();

        if (data) {
            return data;
        }

        return rejectWithValue('No Data Found.');
        
    } catch (error) {
        const errorMessage = error.response?.data || 'An error occurred while fetching texts.';
        return rejectWithValue(errorMessage);
    }
});

export const UpdateTextsThunk = createAsyncThunk(
    'texts/UpdateTexts',
    async ({ id, data }, { rejectWithValue }) => {
      try {
        if (!id || !data) {
          return rejectWithValue('ID and data must be provided.');
        }
  
        const updateData = await UpdateTexts(id, data);
        return updateData;
      } catch (error) {
        const errorMessage = error.response?.data || 'An error occurred while updating texts.';
        return rejectWithValue(errorMessage);
      }
    }
  );
  