import { createCategory, deleteCategory, updateCategory } from './../thunks/categories';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../types/category';
import { fetchCategories } from '../thunks/categories';
import { ConfirmDeleteListItemPopup, SetConfirmDeleteItemPopupPayload } from '../../types/common';

interface CategoriesState {
    items: Array<Category>;
    confirmDeleteCategoryPopup: ConfirmDeleteListItemPopup;
}

const initialState: CategoriesState = {
    items: [],
    confirmDeleteCategoryPopup: {
        isOpen: false,
        isLoading: false,
        data: { name: '', id: 0 },
    },
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setConfirmDeleteCategoryPopup: {
            reducer: (state, { payload }: PayloadAction<SetConfirmDeleteItemPopupPayload>) => {
                state.confirmDeleteCategoryPopup.isOpen = payload.isOpen;
                if (payload.id) {
                    const category = state.items.find((item) => item.id === payload.id);
                    state.confirmDeleteCategoryPopup.data.id = (category as Category).id;
                    state.confirmDeleteCategoryPopup.data.name = (category as Category).name;
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Array<Category>>) => {
                state.items = action.payload;
            })

            .addCase(fetchCategories.rejected, (_, { error }) => {
                window.alert(`Что-то пошло не так... (${error.message})`);
            })

            .addCase(createCategory.fulfilled, (state, { payload }: PayloadAction<Category>) => {
                state.items = [payload, ...state.items];
            })

            .addCase(updateCategory.fulfilled, (state, { payload }: PayloadAction<Category>) => {
                const category = state.items.find((item) => item.id === payload.id);
                Object.assign(category, payload);
            })

            .addCase(deleteCategory.pending, (state) => {
                state.confirmDeleteCategoryPopup.isLoading = true;
            })

            .addCase(deleteCategory.fulfilled, (state, { payload }) => {
                const filteredItems = state.items.filter((item) => item.id !== payload);
                state.items = filteredItems;
                state.confirmDeleteCategoryPopup.isOpen = false;
                state.confirmDeleteCategoryPopup.isLoading = false;
            })

            .addCase(deleteCategory.rejected, (state, { error }) => {
                state.confirmDeleteCategoryPopup.isLoading = false;
                window.alert(`Что-то пошло не так... (${error.message})`);
            });
    },
});

export const { setConfirmDeleteCategoryPopup } = categoriesSlice.actions;
export default categoriesSlice.reducer;
