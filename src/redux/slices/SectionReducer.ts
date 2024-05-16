import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    sectionActual: string;
}

const initialState: IInitialState = {
    sectionActual: "Inicio",
}

export const SectionReducer = createSlice({
    name: "SectionReducer",
    initialState,
    reducers: {
        setCurrentSection(state, action: PayloadAction<string>) {
            state.sectionActual = action.payload
        }
    }
})

export const { setCurrentSection } = SectionReducer.actions
export default SectionReducer.reducer