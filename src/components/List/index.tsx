import React from 'react';

import classes from './list.module.scss';

import { ListItem } from '../ListItem';
import { Category } from '../../types/category';
import { TodoWithPopulateCategory } from '../../selectors/todos';

interface ListProps {
    items: Array<Category | TodoWithPopulateCategory>;
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
