import { CategoryData } from './../../types/category';
import { createCategory } from './../thunks/categories';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../types/category';
import { fetchCategories } from '../thunks/categories';

interface EditPopup {
    isOpen: boolean;
    data: CategoryData;
}

interface CategoriesState {
    items: Array<Category>;
    isOpenCreatePopup: boolean;
    editPopup: EditPopup;
}

const initialState: CategoriesState = {
    items: [],
    isOpenCreatePopup: false,
    editPopup: {
        isOpen: false,
        data: {},
    } as EditPopup,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setIsOpenCreateCategoryPopup: {
            reducer: (state, { payload }: PayloadAction<boolean>) => {
                state.isOpenCreatePopup = payload;
            },
            prepare: (isOpen: boolean) => {
                return {
                    payload: isOpen,
                };
            },
        },

        setEditCategoryPopup: {
            reducer: (state, { payload }: PayloadAction<{ isOpen: boolean; id: number }>) => {
                const category = state.items.find((item) => item.id === payload.id);
                if (category) {
                    state.editPopup.isOpen = payload.isOpen;
                    state.editPopup.data = {
                        name: category.name,
                        description: category.description,
                    };
                }
            },

            prepare: (isOpen: boolean, id: number) => {
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

            .addCase(createCategory.rejected, (_, { error }) => {
                window.alert(`Что-то пошло не так... (${error.message})`);
            });
    },
});

export const { setIsOpenCreateCategoryPopup, setEditCategoryPopup } = categoriesSlice.actions;
export default categoriesSlice.reducer;
