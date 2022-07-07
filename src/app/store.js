import { configureStore } from "@reduxjs/toolkit/";
import { chartReducer } from "../features/chart/chartSlice";

export const store = configureStore({
    reducer: {
        chart: chartReducer
    }
});