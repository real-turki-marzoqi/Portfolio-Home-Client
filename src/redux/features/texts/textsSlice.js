import { getTexts  , UpdateTextsThunk} from './textsThunk';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    texts: null,
    getTextsErrors: null,
    getTextsStatus: 'idle',
    updateTextsStatus:'idle',
    updateTextsErrors:null
};

const textsSlice = createSlice({
    name: 'texts', // اسم الـ Slice يجب أن يكون سلسلة نصية
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // #== START GET TEXTS CASES ==#
            .addCase(getTexts.pending, (state) => {
                state.getTextsStatus = 'loading';
                state.getTextsErrors = null;
            })
            .addCase(getTexts.fulfilled, (state, action) => {
                state.getTextsStatus = 'succeeded';
                state.texts = action.payload;
            })
            .addCase(getTexts.rejected, (state, action) => {
                state.getTextsStatus = 'failed';
                state.getTextsErrors = action.payload || 'An error occurred while fetching texts.';
            })
            // !-- END GET TEXTS CASES --!#

            // #== START UPDATE TEXTS CASSES ==#
            .addCase(UpdateTextsThunk.pending,(state)=>{
                state.updateTextsStatus = "loading"
                state.updateTextsErrors = null 
            })
            .addCase(UpdateTextsThunk.fulfilled , (state, action)=>{

                state.updateTextsStatus = 'succeeded';
                state.texts = action.payload
            })
            .addCase(UpdateTextsThunk.rejected , (state,action)=>{
                state.updateTextsStatus = 'failed';
                state.updateTextsErrors = action.payload || 'An error occurred while Updating texts.';
            })

             // !-- END UPDATE TEXTS CASSES --!

    },
});

export default textsSlice.reducer; 
