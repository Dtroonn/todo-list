import React from 'react';

import startDB from './server/db';
import CategoryService from './server/services/CategoryService';
import TodoService from './server/services/TodoService';

const App: React.FC = () => {
    React.useEffect(() => {
        const start = async () => {
            const result = await startDB();
            const categories = await CategoryService.getAll();
            console.log(categories);
            const todos = await TodoService.getAll();
            console.log(todos);
        };

        start();
    }, []);

    const handleClick = async () => {
        const category = await CategoryService.create({
            name: 'category2',
            description: 'hello',
        });
        console.log(category);
    };

    const onUpdateClick = async () => {
        const category = await CategoryService.update(1, {
            name: 'lalka55',
            description: 'azaza',
        });
        console.log(category);
    };

    const onDeleteClick = async () => {
        await CategoryService.delete(4);
        //console.log('удалено');
    };

    const onCreateTodoClick = async () => {
        const todo = await TodoService.create({
            name: 'hihi',
            categoryId: 4,
            description: 'lalka',
        });
        console.log(todo);
    };

    const onUpdateTodoClick = async () => {
        const todo = await TodoService.update(1, {
            name: 'obnovleno',
            description: 'hoho obnovlenie',
            categoryId: null,
        });
        console.log(todo);
    };

    const onDeleteTodoClick = async () => {
        await TodoService.delete(1);
    };
    return (
        <div className="App">
            <button onClick={handleClick}>Добавить новую категорию</button>
            <button onClick={onUpdateClick}>Обновить категорию</button>
            <button onClick={onDeleteClick}>Удалить категорию</button>
            <div>
                <button onClick={onCreateTodoClick}>Добавить новое todo</button>
                <button onClick={onUpdateTodoClick}>Обновить todo</button>
                <button onClick={onDeleteTodoClick}>Удалить todo</button>
            </div>
        </div>
    );
};

export default App;
