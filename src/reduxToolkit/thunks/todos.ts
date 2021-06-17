import { Todo } from './../../types/todo';
import { createAsyncThunk } from '@reduxjs/toolkit';
import TodoService from '../../server/services/TodoService';

export const fetchTodos = createAsyncThunk<Array<Todo>>('todos/fetchTodos', async () => {
    const todos = await TodoService.getAll();
    return todos;
});
