const INITIALIZED_SUCCESFULLY = 'database initialized successfully';

let db: any;

export const start = (): Promise<typeof INITIALIZED_SUCCESFULLY | never> =>
    new Promise((resolve, reject) => {
        let dbReq = indexedDB.open('todoList', 1);
        dbReq.onupgradeneeded = (event): void => {
            db = (event.target as IDBOpenDBRequest).result;

            db.createObjectStore('categories', { autoIncrement: true });
            const todosStore = db.createObjectStore('todos', { autoIncrement: true });
            todosStore.createIndex('categoryId_idx', 'categoryId');
        };
        dbReq.onsuccess = (event): void => {
            db = (event.target as IDBOpenDBRequest).result;
            resolve(INITIALIZED_SUCCESFULLY);
        };
        dbReq.onerror = (event): void => {
            reject('error opening database');
        };
    });

export default start;
export { db };
