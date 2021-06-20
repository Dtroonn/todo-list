import { Todo } from '../../types/todo';
import { Category } from '../../types/category';
import { createTodo, updateTodo } from '../thunks/todos';
import { updateCategory } from '../thunks/categories';
import { RootState } from '../store';
import {
    FormListItemPopupState,
    VariantsFormListItemPopup,
    FormListItemPopupValues,
} from '../../components/Popups/FormListItemPopup/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createCategory } from '../thunks/categories';

interface FormListItemPopup {
    state: FormListItemPopupState;
    variant: VariantsFormListItemPopup | undefined;
    defaultValues: FormListItemPopupValues | undefined;
    itemId: number;
    isOpen: boolean;
}

const initialState: FormListItemPopup = {
    state: FormListItemPopupState.Default,
    variant: undefined,
    defaultValues: undefined,
    isOpen: false,
    itemId: 0,
};

interface SetFormListItemPopupArgs {
    isOpen: boolean;
    variant?: VariantsFormListItemPopup;
    itemId?: number;
}

interface SetFormListItemPopupReturned extends SetFormListItemPopupArgs {
    defaultValues: FormListItemPopupValues | undefined;
}

export const setFormListItemPopup = createAsyncThunk<
    SetFormListItemPopupReturned,
    SetFormListItemPopupArgs,
    { state: RootState }
>('popups/setFormListPopup', (data, { getState }) => {
    let payload: SetFormListItemPopupReturned = { ...data, defaultValues: undefined };
    if (data.variant && payload.itemId) {
        const { categories, todos } = getState();
        if (data.variant === VariantsFormListItemPopup.EditCategory) {
            const category = categories.items.find((item) => item.id === payload.itemId);
            payload.defaultValues = {
                name: (category as Category).name,
                description: (category as Category).description,
            };
        }
        if (data.variant === VariantsFormListItemPopup.EditTodo) {
            const todo = todos.items.find((item) => item.id === payload.itemId);
            payload.defaultValues = {
                name: (todo as Todo).name,
                description: (todo as Todo).description,
                category: (todo as Todo).category,
            };
        }
    }

    return payload;
});

const popupsSlice = createSlice({
    name: 'popups',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setFormListItemPopup.fulfilled, (state, { payload }) => {
                Object.assign(state, payload);
            })

            .addCase(createCategory.pending, (state) => {
                state.state = FormListItemPopupState.Loading;
            })

            .addCase(createCategory.fulfilled, (state) => {
                state.state = FormListItemPopupState.Success;
            })

            .addCase(createCategory.rejected, (state, { error }) => {
                state.state = FormListItemPopupState.Default;
                window.alert(`Что-то пошло не так... (${error.message})`);
            })

            .addCase(updateCategory.pending, (state) => {
                state.state = FormListItemPopupState.Loading;
            })

            .addCase(updateCategory.fulfilled, (state) => {
                state.state = FormListItemPopupState.Success;
            })

            .addCase(updateCategory.rejected, (state, { error }) => {
                state.state = FormListItemPopupState.Default;
                window.alert(`Что-то пошло не так... (${error.message})`);
            })

            .addCase(createTodo.pending, (state) => {
                state.state = FormListItemPopupState.Loading;
            })

            .addCase(createTodo.fulfilled, (state) => {
                state.state = FormListItemPopupState.Success;
            })

            .addCase(createTodo.rejected, (state, { error }) => {
                state.state = FormListItemPopupState.Default;
                window.alert(`Что-то пошло не так... (${error.message})`);
            })

            .addCase(updateTodo.pending, (state) => {
                state.state = FormListItemPopupState.Loading;
            })

            .addCase(updateTodo.fulfilled, (state) => {
                state.state = FormListItemPopupState.Success;
            })

            .addCase(updateTodo.rejected, (state, { error }) => {
                state.state = FormListItemPopupState.Default;
                window.alert(`Что-то пошло не так... (${error.message})`);
            });
    },
});

export default popupsSlice.reducer;
