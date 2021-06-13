import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Header } from './components/header';
import { CategoriesPage } from './pages/Categories';
import { NotFoundPage } from './pages/NotFound';
import { TodosPage } from './pages/Todos';

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
        <Router>
            <div className="App">
                <div className="wrapper">
                    <Header />
                    <main>
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/todos" />
                            </Route>
                            <Route exact path="/categories" component={CategoriesPage} />
                            <Route exact path="/todos" component={TodosPage} />
                            <Route exact path="/notFound" component={NotFoundPage} />
                            <Redirect to="/notFound" />
                        </Switch>
                    </main>
                </div>
            </div>
        </Router>
    );
};

export default App;
