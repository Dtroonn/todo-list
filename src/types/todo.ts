export interface TodoData {
    name: string;
    description?: string;
    categoryId?: number;
}

export interface Todo extends TodoData {
    id: number;
}
