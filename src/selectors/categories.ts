import { RootState } from './../reduxToolkit/store';

export const selectCategories = (state: RootState) => state.categories.items;
