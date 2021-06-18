export interface TodoData {
    name: string;
    description?: string;
    category?: number | string;
}

export interface Todo extends TodoData {
    id: number;
}
