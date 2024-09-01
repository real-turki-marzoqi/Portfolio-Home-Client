import { configureStore } from "@reduxjs/toolkit";
import personalInfoReducer from "../features/personalInformations/personalInfoSlice";
import textsReducer from '../features/texts/textsSlice'
import messagesReducer from "../features/messages/messagesSlice";

export const Store = configureStore({
  reducer: {
    personalInfo: personalInfoReducer,
    texts:textsReducer,
    messages:messagesReducer
  },
});
