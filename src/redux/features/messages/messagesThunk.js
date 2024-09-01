import { getMessages  , deleteMessage , addMessage} from "./messagesAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMessagesThunk = createAsyncThunk(
  'Messages/getMessages', 
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMessages();
      if (data) {
        return data;
      }
      return rejectWithValue('No data found');
    } catch (error) {
      const errorMessage = error.response?.data || 'An error occurred while fetching messages';
      return rejectWithValue(errorMessage);
    }
  }
);


export const deleteMessageThunk = createAsyncThunk(
  'Messages/deleteMessages',
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteMessage(id);

      if (data) {
        return data;
      }

      return rejectWithValue('No data found to delete');
    } catch (error) {
      const errorMessage = error.response?.data || `An error occurred while deleting the message with ID ${id}`;
      return rejectWithValue(errorMessage);
    }
  }
);

export const addMessageThunk = createAsyncThunk(
  'Messages/addMessage',
  async (data, { rejectWithValue }) => {
    try {
    
      const newMessageData = await addMessage(data);
      

      if (newMessageData) {
        return newMessageData;
      }


      return rejectWithValue('No data found to add');
    } catch (error) {

      const errorMessage = error.response?.data || 'An error occurred while adding messages';
      return rejectWithValue(errorMessage);
    }
  }
);