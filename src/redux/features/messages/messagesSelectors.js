

export const selectGetMessages = (state) => state.messages.getMessages;
export const selectGetMessagesErrors = (state) => state.messages.getMessagesErrors;
export const selectGetMessagesStatus = (state) => state.messages.getMessagesStatus;

export const selectDeleteMessagesErrors = (state) => state.messages.deleteMessagesErrors;
export const selectDeleteMessagesStatus = (state) => state.messages.deleteMessagesStatus;

export const selectAddMessagesErrors = (state) =>state.messages.addMessageErrors;
export const selectAddMessagesStatus = (state) => state.messages.addMessageStatus;
