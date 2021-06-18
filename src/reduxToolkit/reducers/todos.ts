import { createTodo } from './../thunks/todos';
import { Todo } from './../../types/todo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTodos } from '../thunks/todos';

interface CategoriesState {
    items: Array<Todo>;
    isOpenCreatePopup: boolean;
}

const initialState: CategoriesState = {
    items: [],
    isOpenCreatePopup: false,
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setIsOpenCreateTodoPopup: {
            reducer: (state, { payload }: PayloadAction<boolean>) => {
                state.isOpenCreatePopup = payload;
            },
            prepare: (isOpen: boolean) => {
                return {
                    payload: isOpen,
                };
            },
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Array<Todo>>) => {
                state.items = action.payload;
            })

            .addCase(fetchTodos.rejected, (_, { error }) => {
                window.alert(`Что-то пошло не так... (${error.message})`);
            })

            .addCase(createTodo.fulfilled, (state, { payload }: PayloadAction<Todo>) => {
                state.items = [payload, ...state.items];
            })

            .addCase(createTodo.rejected, (_, { error }) => {
                window.alert(`Что-то пошло не так... (${error.message})`);
            });
    },
});

export const { setIsOpenCreateTodoPopup } = todosSlice.actions;
export default todosSlice.reducer;
