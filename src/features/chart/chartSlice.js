import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataByYear } from "../../services/chartServices";

const getGoalDataHelper = createAsyncThunk(
    'data/getGoalData',
    async({year, goal}, {rejectedWithValue}) => {
        try{
            const response = await getDataByYear(year);
            return {response, year, goal};
        }catch(error){
            console.log("slice err", error);
            return rejectedWithValue(error);
        }
    },
);

const initialState = {
    year: "",
    goal: "",
    data: [],
    isLoading: false,
    error: null,
}

const chartSlice = createSlice({
    name: "chart",
    initialState,

    extraReducers: {
        [getGoalDataHelper.pending]: state => {
            state.isLoading = true;
        },

        [getGoalDataHelper.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.data = payload.response;
            state.goal = payload.goal;
            state.year = payload.year; 
            state.error = null
        },
        
        [getGoalDataHelper.rejected]: (state, {payload}) => {
            state.isLoading = false;
            // state.error = payload.error
        }
    } 
});

export { getGoalDataHelper }
export const chartReducer = chartSlice.reducer;