import { Category } from '../../types/category';

export const sortItemsByIdDESK = (a: Category, b: Category): number => {
    return b.id - a.id;
};
