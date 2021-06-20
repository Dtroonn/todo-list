import { createAsyncThunk } from '@reduxjs/toolkit';
import CategoryService from '../../server/services/CategoryService';
import { Category, CategoryData } from '../../types/category';
import { deleteTodosByCategory } from '../reducers/todos';

export const fetchCategories = createAsyncThunk<Array<Category>>(
    'categories/fetchCategories',
    async () => {
        const categories: Array<Category> = await CategoryService.getAll();
        return categories;
    },
);

export const createCategory = createAsyncThunk<Category, CategoryData>(
    'categories/createCategory',
    async (data) => {
        const category: Category = await CategoryService.create(data);
        console.log(category);
        return category;
    },
);

export interface UpdateCategoryArg {
    data: CategoryData;
    id: number;
}

export const updateCategory = createAsyncThunk<Category, UpdateCategoryArg>(
    'categories/updateCategory',
    async (data) => {
        const category: Category = await CategoryService.update(data.id, data.data);
        return category;
    },
);

export const deleteCategory = createAsyncThunk<number, number>(
    'categories/deleteCategory',
    async (id: number, thunkApi) => {
        CategoryService.delete(id);
        thunkApi.dispatch(deleteTodosByCategory(id));
        return id;
    },
);
