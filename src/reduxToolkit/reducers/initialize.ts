import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { initializeApp } from '../thunks/initialize';

interface InitializeState {
    isLoaded: boolean;
}

const initialState: InitializeState = {
    isLoaded: false,
};

const initializeSlice = createSlice({
    name: 'initialize',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initializeApp.fulfilled, (state) => {
                state.isLoaded = true;
            })

            .addCase(initializeApp.rejected, (state, { error }) => {
                window.alert(`Что-то пошло не так... (ERROR: ${error.message})`);
                state.isLoaded = true;
            });
    },
});

export default initializeSlice.reducer;
