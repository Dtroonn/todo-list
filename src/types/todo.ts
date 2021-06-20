export interface TodoData {
    name: string;
    description?: string;
    category?: number;
}

export interface Todo extends TodoData {
    id: number;
}
