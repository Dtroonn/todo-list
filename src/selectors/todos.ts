import { Todo } from './../types/todo';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './../reduxToolkit/store';
import { selectCategories } from './categories';

export const selectTodos = (state: RootState) => state.todos.items;

export interface TodoWithPopulateCategory {
    name: string;
    id: number;
    category: string | null;
    description?: string;
}

export const selectTodosWithPopulateCategory = createSelector(
    [selectTodos, selectCategories],
    (todos, categories): Array<TodoWithPopulateCategory> => {
        return todos.map((todo) => {
            const category = categories.find((category) => category.id === todo.category);

            return {
                ...todo,
                category: category ? category.name : null,
            };
        });
    },
);
