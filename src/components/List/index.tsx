import React from 'react';

import classes from './list.module.scss';

import { IListItem, ListItem } from '../ListItem';

interface ListProps {
    items: Array<IListItem>;
    onEditItemButtonClick?: (id: number) => void;
    onDeleteItemButtonClick?: (id: number) => void;
}

export const List: React.FC<ListProps> = ({
    items,
    onEditItemButtonClick,
    onDeleteItemButtonClick,
}) => {
    return (
        <div className="container">
            <ul className={classes.list}>
                {items.map((item) => (
                    <ListItem
                        onDeleteButtonClick={onDeleteItemButtonClick}
                        onEditButtonClick={onEditItemButtonClick}
                        key={item.id}
                        {...item}
                    />
                ))}
            </ul>
        </div>
    );
};
