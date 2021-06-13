export interface TodoData {
    name: string;
    description?: string;
    categoryId?: number | null;
}

export interface Todo extends TodoData {
    id: number;
}
