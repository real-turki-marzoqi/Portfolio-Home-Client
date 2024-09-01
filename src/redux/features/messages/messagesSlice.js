import { addMessage } from "./messagesAPI";
import { getMessagesThunk, deleteMessageThunk, addMessageThunk } from "./messagesThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getMessages: [], // افتراض أن هذه قائمة
  getMessagesErrors: null,
  getMessagesStatus: 'idle',

  deleteMessagesErrors: null,
  deleteMessagesStatus: 'idle',

  addMessageErrors: null,
  addMessageStatus: 'idle'
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // #== START GET MESSAGES CASES ==#
      .addCase(getMessagesThunk.pending, (state) => {
        state.getMessagesStatus = "loading";
        state.getMessagesErrors = null;
      })
      .addCase(getMessagesThunk.fulfilled, (state, action) => {
        state.getMessagesStatus = "succeeded";
        state.getMessages = action.payload;
      })
      .addCase(getMessagesThunk.rejected, (state, action) => {
        state.getMessagesStatus = "failed"; // تصحيح الكتابة
        state.getMessagesErrors = action.payload;
      })
      // !-- END GET MESSAGES CASES --!

      // #== START DELETE MESSAGES CASES ==#
      .addCase(deleteMessageThunk.pending, (state) => {
        state.deleteMessagesStatus = 'loading';
        state.deleteMessagesErrors = null;
      })
      .addCase(deleteMessageThunk.fulfilled, (state, action) => {
        state.deleteMessagesStatus = 'succeeded';
        // إزالة الرسالة المحذوفة من الحالة
        state.getMessages = state.getMessages.filter(
          message => message.id !== action.meta.arg // التأكد من أن `action.meta.arg` هو الـ ID للرسالة المحذوفة
        );
      })
      .addCase(deleteMessageThunk.rejected, (state, action) => {
        state.deleteMessagesStatus = 'failed'; // تصحيح الكتابة
        state.deleteMessagesErrors = action.payload;
      })
      // !-- END DELETE MESSAGES CASES --!

      // #== START ADD MESSAGES CASES ==#
      .addCase(addMessageThunk.pending, (state) => {
        state.addMessageStatus = 'loading';
        state.addMessageErrors = null;
      })
      .addCase(addMessageThunk.fulfilled, (state, action) => {
        state.addMessageStatus = 'succeeded';
        // إضافة الرسالة الجديدة إلى القائمة
        state.getMessages = [...state.getMessages, action.payload];
      })
      .addCase(addMessageThunk.rejected, (state, action) => {
        state.addMessageStatus = 'failed'; // تصحيح الكتابة
        state.addMessageErrors = action.payload;
      });
      // !-- END ADD MESSAGES CASES --!
  },
});

export default messagesSlice.reducer;
