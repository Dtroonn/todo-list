import {
    ConfirmDeleteListItemPopup,
    ConfirmDeleteListItemPopupData,
    SetConfirmDeleteItemPopupPayload,
} from './../../types/common';
import { createTodo, deleteTodo, updateTodo } from './../thunks/todos';
import { Todo } from './../../types/todo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTodos } from '../thunks/todos';

interface TodosState {
    items: Array<Todo>;
    confirmDeleteTodoPopup: ConfirmDeleteListItemPopup;
}

const initialState: TodosState = {
    items: [],
    confirmDeleteTodoPopup: {
        isOpen: false,
        isLoading: false,
        data: { name: '', id: 0 },
    },
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setConfirmDeleteTodoPopup: {
            reducer: (state, { payload }: PayloadAction<SetConfirmDeleteItemPopupPayload>) => {
                state.confirmDeleteTodoPopup.isOpen = payload.isOpen;
                if (payload.id) {
                    const todo = state.items.find((item) => item.id === payload.id);
                    state.confirmDeleteTodoPopup.data.id = (todo as Todo).id;
                    state.confirmDeleteTodoPopup.data.name = (todo as Todo).name;
                }
            },

            prepare: (isOpen: boolean, id?: number) => {
                return {
                    payload: {
                        isOpen,
                        id,
                    },
                };
            },
        },

        deleteTodosByCategory: {
            reducer: (state, { payload }: PayloadAction<number>) => {
                const filteredItems = state.items.filter((item) => item.category !== payload);
                state.items = filteredItems;
            },

            prepare: (id: number) => {
                return {
                    payload: id,
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

            .addCase(updateTodo.fulfilled, (state, { payload }: PayloadAction<Todo>) => {
                const todo = state.items.find((item) => item.id === payload.id);
                Object.assign(todo, payload);
            })

            .addCase(deleteTodo.pending, (state) => {
                state.confirmDeleteTodoPopup.isLoading = true;
            })

            .addCase(deleteTodo.fulfilled, (state, { payload }) => {
                const filteredItems = state.items.filter((item) => item.id !== payload);
                state.items = filteredItems;
                state.confirmDeleteTodoPopup.isOpen = false;
                state.confirmDeleteTodoPopup.isLoading = false;
            })

            .addCase(deleteTodo.rejected, (state, { error }) => {
                state.confirmDeleteTodoPopup.isLoading = false;
                window.alert(`Что-то пошло не так... (${error.message})`);
            });
    },
});

export const { deleteTodosByCategory } = todosSlice.actions;
export const { setConfirmDeleteTodoPopup } = todosSlice.actions;
export default todosSlice.reducer;
