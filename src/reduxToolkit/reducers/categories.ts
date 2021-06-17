import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../types/category';
import { fetchCategories } from '../thunks/categories';

interface CategoriesState {
    items: Array<Category>;
    isOpenCreatePopup: boolean;
}

const initialState: CategoriesState = {
    items: [],
    isOpenCreatePopup: false,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setIsOpenCreateCategoryPopup: {
            reducer: (state, action: PayloadAction<boolean>) => {
                state.isOpenCreatePopup = action.payload;
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
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Array<Category>>) => {
                state.items = action.payload;
            })

            .addCase(fetchCategories.rejected, (_, { error }) => {
                window.alert(`Что-то пошло не так... (${error.message})`);
            });
    },
});

export const { setIsOpenCreateCategoryPopup } = categoriesSlice.actions;
export default categoriesSlice.reducer;
