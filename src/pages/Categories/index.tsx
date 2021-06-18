import React from 'react';
import { useDispatch } from 'react-redux';

import { List } from '../../components/List';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setEditCategoryPopup } from '../../reduxToolkit/reducers/categories';

export const CategoriesPage = () => {
    const dispatch = useDispatch();
    const categories = useTypedSelector((state) => state.categories.items);

    const onOpenEditCategoryPopupClick = (id: number) => {
        dispatch(setEditCategoryPopup(true, id));
    };

    return (
        <>
            <List onEditItemButtonClick={onOpenEditCategoryPopupClick} items={categories} />
        </>
    );
};
