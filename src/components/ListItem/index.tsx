import React from 'react';

import classes from './listItem.module.scss';

export const ListItem = () => {
    return (
        <li className={classes.item}>
            <div className={classes.content}>
                <div className={classes.header}>
                    <div className={classes.title}>Задача1</div>
                    <div className={classes.category}>
                        <div className={classes.icon}>
                            <svg
                                width="24"
                                height="20"
                                viewBox="0 0 24 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M21.8823 3.21536H12.1365L10.1953 0.907127C10.1373 0.83748 10.0505 0.798421 9.95999 0.801245H2.11765C0.943765 0.812892 -0.00135149 1.76848 1.45074e-06 2.94242V17.0601C-5.73727e-05 18.2331 0.944706 19.1873 2.11765 19.1989H21.8823C23.0553 19.1873 24 18.2331 24 17.0601V5.35419C24 4.18119 23.0553 3.22701 21.8823 3.21536Z"
                                    fill="#3F72AF"
                                />
                            </svg>
                        </div>
                        <div className={classes.label}>Категория1</div>
                    </div>
                </div>
                <div className={classes.description}>Описание задачи, может быть длинным</div>
            </div>
            <div className={classes.actions}>
                <div className={classes.actionsItem}>
                    <button></button>
                </div>
                <div className={classes.actionsItem}>
                    <button>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0 18.9993V24H5.00069L19.756 9.24459L14.7553 4.2439L0 18.9993Z"
                                fill="#3F72AF"
                            />
                            <path
                                d="M23.61 3.5038L20.4962 0.390054C19.9762 -0.130018 19.1294 -0.130018 18.6093 0.390054L16.1689 2.83039L21.1696 7.83108L23.61 5.39074C24.1301 4.87067 24.1301 4.02387 23.61 3.5038Z"
                                fill="#3F72AF"
                            />
                        </svg>
                    </button>
                </div>
                <div className={classes.actionsItem}>
                    <button>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4 21.3333C4 22.8067 5.19331 24 6.66669 24H17.3334C18.8067 24 20 22.8067 20 21.3333V5.33331H4V21.3333Z"
                                fill="#3F72AF"
                            />
                            <path
                                d="M16.6667 1.33331L15.3334 0H8.66675L7.33337 1.33331H2.66675V4H21.3334V1.33331H16.6667Z"
                                fill="#3F72AF"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </li>
    );
};
