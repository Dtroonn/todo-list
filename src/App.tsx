import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Header } from './components/Header';

import { Popups } from './components/Popups';
import { useTypedSelector } from './hooks/useTypedSelector';
import { CategoriesPage } from './pages/Categories';
import { NotFoundPage } from './pages/NotFound';
import { TodosPage } from './pages/Todos';
import { initializeApp } from './reduxToolkit/thunks/initialize';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const isLoaded = useTypedSelector((state) => state.initialize.isLoaded);

    React.useEffect(() => {
        dispatch(initializeApp());
    }, []);

    if (!isLoaded) {
        return (
            <div
                style={{
                    fontSize: '44px',
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                Загрузка...
            </div>
        );
    }

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
                    <Popups />
                </div>
            </div>
        </Router>
    );
};

export default App;
