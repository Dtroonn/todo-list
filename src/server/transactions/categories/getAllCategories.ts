import { db } from '../../db';
import { Category } from '../../../types/category';

export const getAllCategories = () =>
    new Promise((resolve, reject) => {
        const transaction = db.transaction('categories');
        const categories = transaction.objectStore('categories');

        const request = categories.openCursor();

        const categoriesItems: Array<Category> = [];

        // вызывается для каждой найденной курсором книги
        request.onsuccess = function () {
            let cursor = request.result;
            if (cursor) {
                let id = cursor.key; // ключ книги (поле id)
                let value = cursor.value; // объект книги
                categoriesItems.push({
                    id,
                    value,
                });
                cursor.continue();
            } else {
                resolve(categoriesItems);
            }
        };
    });
