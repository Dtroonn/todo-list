import {Category} from '../../../types/category'
import { db } from '../../db';




export const addCategory = (name: string): Promise<Category | never> => new Promise((resolve, reject) => {
    const tx = db.transaction('categories', 'readwrite');
    const categories = tx.objectStore('categories');

  
    const request = categories.add({
        name: name
    });
  // Ожидаем завершения транзакции базы данных
    request.onsuccess = (): void => {
        resolve({
            id: request.result,
            name,
        });
    }

    request.onerror = (): void => {
        reject('some error');
    }
}) 
    


export default addCategory;