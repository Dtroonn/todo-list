export interface CategoryData {
    name: string;
    description?: string;
}

export interface Category extends CategoryData {
    id: number;
}
