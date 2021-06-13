import { Todo, TodoData } from '../../types/todo';
import { db } from '../db';
import { sortItemsByIdDESK } from '../utils/sortItemsByIdDESK';

interface ITodoService {
    getAll(): Promise<Array<Todo> | never>;
    create(data: TodoData): Promise<Todo | never>;
    getAllIdsByCategory(category: number): Promise<Array<number> | never>;
    update(id: number, data: TodoData): Promise<Todo | never>;
    delete(id: number): Promise<void | never>;
}

class TodoService implements ITodoService {
    getAll(): Promise<Array<Todo> | never> {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction('todos');
            const todosStore = transaction.objectStore('todos');

            const request = todosStore.openCursor();

            const todos: Array<Todo> = [];

            request.onsuccess = function (): void {
                const cursor = request.result;
                if (cursor) {
                    const id = cursor.key;
                    const value = cursor.value;
                    todos.push({
                        id,
                        ...value,
                    });
                    cursor.continue();
                } else {
                    resolve(todos.sort(sortItemsByIdDESK));
                }
            };

            request.onerror = (): void => {
                reject('some error');
            };
        });
    }
    create(data: TodoData): Promise<Todo | never> {
        return new Promise((resolve, reject) => {
            const tx = db.transaction('todos', 'readwrite');
            const todosStore = tx.objectStore('todos');

            const request = todosStore.add(data);

            tx.oncomplete = (): void => {
                resolve({
                    id: request.result,
                    ...data,
                });
            };

            tx.onerror = (): void => {
                reject('some error');
            };
        });
    }

    update(id: number, data: TodoData): Promise<Todo | never> {
        return new Promise((resolve, reject) => {
            const tx = db.transaction('todos', 'readwrite');
            const todosStore = tx.objectStore('todos');

            const request = todosStore.put(data, id);

            tx.oncomplete = (): void => {
                resolve({
                    id: request.result,
                    ...data,
                });
            };

            tx.onerror = (): void => {
                reject('some error');
            };
        });
    }

    delete(id: number): Promise<void | never> {
        return new Promise((resolve, reject) => {
            const tx = db.transaction('todos', 'readwrite');
            const todosStore = tx.objectStore('todos');

            todosStore.delete(id);

            tx.oncomplete = (): void => {
                resolve();
            };

            tx.onerror = (): void => {
                reject('some error');
            };
        });
    }

    getAllIdsByCategory(categoryId: number): Promise<Array<number> | never> {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction('todos');
            const todosStore = transaction.objectStore('todos');

            const categoryIdIdx = todosStore.index('categoryId_idx');
            const request = categoryIdIdx.getAllKeys(categoryId);

            request.onsuccess = function (): void {
                resolve(request.result);
            };

            request.onerror = (): void => {
                reject('some error');
            };
        });
    }
}

export default new TodoService();
