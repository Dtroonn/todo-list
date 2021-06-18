import { Todo, TodoData } from './../../types/todo';
import { createAsyncThunk } from '@reduxjs/toolkit';
import TodoService from '../../server/services/TodoService';

export const fetchTodos = createAsyncThunk<Array<Todo>>('todos/fetchTodos', async () => {
    const todos = await TodoService.getAll();
    return todos;
});

export const createTodo = createAsyncThunk<Todo, TodoData>('todos/createTodo', async (data) => {
    await new Promise((resolve, reject) => {
        setTimeout(() => resolve('awdaw'), 5000);
    });
    const todo: Todo = await TodoService.create(data);
    return todo;
});
