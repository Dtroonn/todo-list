import React from 'react';
import { NavLink, Route } from 'react-router-dom';

import classes from './header.module.scss';

export const Header = () => {
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
                        <div className={classes.addButton}>Добавить задачу</div>
                    </Route>
                    <Route path="/categories">
                        <button className={classes.addButton}>Добавить категорию</button>
                    </Route>
                </div>
            </div>
        </header>
    );
};
