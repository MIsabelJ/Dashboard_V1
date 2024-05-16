
import { configureStore } from "@reduxjs/toolkit";
import SectionReducer from "./slices/SectionReducer";
import TableReducer from "./slices/TablaReducer";

export const store = configureStore({
  reducer: {
    sectionReducer: SectionReducer,
    tableReducer: TableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
