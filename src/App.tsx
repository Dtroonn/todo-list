import React from 'react';

import startDB from './server/db';
import addCategory from './server/transactions/categories/addCategory';
import { getAllCategories } from './server/transactions/categories/getAllCategories';

function App() {
    React.useEffect(() => {
        const start = async () => {
            const result = await startDB();
            console.log(result);
            getAllCategories();
        };

        start();
    }, []);

    const handleClick = async () => {
        const category = await addCategory('lalka');
        console.log(category);
    };
    return (
        <div className="App">
            <button onClick={handleClick}>Добавить новую категорию</button>
        </div>
    );
}

export default App;
