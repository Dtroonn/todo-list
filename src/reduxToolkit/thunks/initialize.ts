import { createAsyncThunk } from '@reduxjs/toolkit';
import startDB from '../../server/db';
import { fetchCategories } from './categories';
import { fetchTodos } from './todos';

export const initializeApp = createAsyncThunk('initializeApp', async (_, thunkAPI) => {
    await startDB();
    await Promise.all([thunkAPI.dispatch(fetchCategories()), thunkAPI.dispatch(fetchTodos())]);
});
