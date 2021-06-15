import React from 'react';

import classes from './list.module.scss';

import { ListItem } from '../ListItem';

export const List = () => {
    return (
        <div className="container">
            <ul className={classes.list}>
                <ListItem />
                <ListItem />
            </ul>
        </div>
    );
};
