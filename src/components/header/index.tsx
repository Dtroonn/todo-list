import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { setIsOpenCreateCategoryPopup } from '../../reduxToolkit/reducers/categories';
import { setIsOpenCreateTodoPopup } from '../../reduxToolkit/reducers/todos';

import classes from './header.module.scss';

export const Header = () => {
    const dispatch = useDispatch();
    return (
        <header className={classes.header}>
            <div className="container">
                <div className={classes.body}>
                    <div className={classes.logo}>ToDo List</div>
                    <nav className={classes.menu}>
                        <ul className={classes.menuList}>
                            <li>
                                <NavLink
                                    className={classes.menuLink}
                                    activeClassName={classes.active}
                                    to="/todos">
                                    Задачи
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={classes.menuLink}
                                    activeClassName={classes.active}
                                    to="/categories">
                                    Категории
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <Route path="/todos">
                        <div
                            onClick={() => dispatch(setIsOpenCreateTodoPopup(true))}
                            className={classes.addButton}>
                            Добавить задачу
                        </div>
                    </Route>
                    <Route path="/categories">
                        <button
                            onClick={() => dispatch(setIsOpenCreateCategoryPopup(true))}
                            className={classes.addButton}>
                            Добавить категорию
                        </button>
                    </Route>
                </div>
            </div>
        </header>
    );
};
