import { createAsyncThunk } from '@reduxjs/toolkit';
import CategoryService from '../../server/services/CategoryService';
import { Category, CategoryData } from '../../types/category';

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
