import { Todo, TodoData } from './../../types/todo';
import { createAsyncThunk } from '@reduxjs/toolkit';
import TodoService from '../../server/services/TodoService';

export const fetchTodos = createAsyncThunk<Array<Todo>>('todos/fetchTodos', async () => {
    const todos = await TodoService.getAll();
    return todos;
});

export const createTodo = createAsyncThunk<Todo, TodoData>('todos/createTodo', async (data) => {
    const todo: Todo = await TodoService.create(data);
    return todo;
});

export interface UpdateTodoArg {
    data: TodoData;
    id: number;
}

export const updateTodo = createAsyncThunk<Todo, UpdateTodoArg>(
    'todos/updateTodo',
    async (data) => {
        const todo: Todo = await TodoService.update(data.id, data.data);
        return todo;
    },
);

export const deleteTodo = createAsyncThunk<number, number>('todos/deleteTodo', async (id) => {
    await TodoService.delete(id);
    return id;
});
