

export const selectTexts = (state) => state.texts.texts ; 
export const selectTextsStatus = (state) => state.texts.getTextsStatus || 'idle'; 
export const selectTextErrors = (state) => state.texts.getTextsErrors || null; 

export const selectUpdateTextsErrors = (state)=>state.texts.updateTextsErrors
export const selectUpdateTextsStatus = (state)=>state.texts.updateTextsStatus
