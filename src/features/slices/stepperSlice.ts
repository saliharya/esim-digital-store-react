import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface StepperState {
    currentStep: number;
}

const initialState: StepperState = {
    currentStep: 0,
};

const stepperSlice = createSlice({
    name: 'stepper',
    initialState,
    reducers: {
        nextStep: (state) => {
            state.currentStep += 1;
        },
        prevStep: (state) => {
            state.currentStep = Math.max(state.currentStep - 1, 0);
        },
        setStep: (state, action: PayloadAction<number>) => {
            state.currentStep = action.payload;
        },
    },
});

export const { nextStep, prevStep, setStep } = stepperSlice.actions;
export default stepperSlice.reducer;
