import { Category, CategoryData } from '../../types/category';
import { db } from '../db';
import { sortItemsByIdDESK } from '../utils/sortItemsByIdDESK';
import TodoService from './TodoService';

interface ICategoryService {
    getAll(): Promise<Array<Category> | never>;
    create(data: CategoryData): Promise<Category | never>;
    update(id: number, data: CategoryData): Promise<Category | never>;
    delete(id: number): Promise<void | never>;
}

class CategoryService implements ICategoryService {
    getAll(): Promise<Array<Category> | never> {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction('categories');
            const categoriesStore = transaction.objectStore('categories');

            const request = categoriesStore.openCursor();

            const categories: Array<Category> = [];

            // вызывается для каждой найденной курсором категории
            request.onsuccess = function (): void {
                const cursor = request.result;
                if (cursor) {
                    const id = cursor.key; // ключ категории (поле id)
                    const value = cursor.value; // body категории
                    categories.push({
                        id,
                        ...value,
                    });
                    cursor.continue();
                } else {
                    resolve(categories.sort(sortItemsByIdDESK));
                }
            };

            request.onerror = (): void => {
                reject('some error');
            };
        });
    }

    create(data: CategoryData): Promise<Category | never> {
        return new Promise((resolve, reject) => {
            const tx = db.transaction('categories', 'readwrite');
            const categoriesStore = tx.objectStore('categories');

            const request = categoriesStore.add(data);

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

    update(id: number, data: CategoryData): Promise<Category | never> {
        return new Promise((resolve, reject) => {
            const tx = db.transaction('categories', 'readwrite');
            const categoriesStore = tx.objectStore('categories');

            const request = categoriesStore.put(data, id);

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
            const tx = db.transaction('categories', 'readwrite');
            const categoriesStore = tx.objectStore('categories');

            categoriesStore.delete(id);

            tx.oncomplete = async (): Promise<void> => {
                try {
                    const todosIds = await TodoService.getAllIdsByCategory(id);
                    await Promise.all(todosIds.map((id) => TodoService.delete(id)));
                    resolve();
                } catch (e) {
                    console.log('proizoshla oshibka');
                    reject('some error');
                }
            };

            tx.onerror = (): void => {
                reject('some error');
            };
        });
    }
}

export default new CategoryService();
