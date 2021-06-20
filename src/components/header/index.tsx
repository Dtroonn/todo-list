import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { setFormListItemPopup } from '../../reduxToolkit/reducers/formListItemPopup';

import { VariantsFormListItemPopup } from '../Popups/FormListItemPopup';

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
                            onClick={() =>
                                dispatch(
                                    setFormListItemPopup({
                                        isOpen: true,
                                        variant: VariantsFormListItemPopup.CreateTodo,
                                    }),
                                )
                            }
                            className={classes.addButton}>
                            Добавить задачу
                        </div>
                    </Route>
                    <Route path="/categories">
                        <button
                            onClick={() =>
                                dispatch(
                                    setFormListItemPopup({
                                        isOpen: true,
                                        variant: VariantsFormListItemPopup.CreateCategory,
                                    }),
                                )
                            }
                            className={classes.addButton}>
                            Добавить категорию
                        </button>
                    </Route>
                </div>
            </div>
        </header>
    );
};
