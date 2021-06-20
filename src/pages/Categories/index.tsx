import React from 'react';
import { useDispatch } from 'react-redux';

import { List } from '../../components/List';
import { VariantsFormListItemPopup } from '../../components/Popups/FormListItemPopup';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setConfirmDeleteCategoryPopup } from '../../reduxToolkit/reducers/categories';
import { setFormListItemPopup } from '../../reduxToolkit/reducers/formListItemPopup';
import { selectCategories } from '../../selectors/categories';

export const CategoriesPage = () => {
    const dispatch = useDispatch();
    const categories = useTypedSelector(selectCategories);

    const onOpenEditCategoryPopupClick = React.useCallback((id: number) => {
        dispatch(
            setFormListItemPopup({
                isOpen: true,
                variant: VariantsFormListItemPopup.EditCategory,
                itemId: id,
            }),
        );
    }, []);

    const onOpenDeleteCategoryPopupClick = React.useCallback((id: number) => {
        dispatch(setConfirmDeleteCategoryPopup(true, id));
    }, []);

    return (
        <>
            {categories.length === 0 && (
                <div style={{ textAlign: 'center', fontSize: '25px' }}>
                    Список категорий пуст. Добавьте какую нибудь категорию!
                </div>
            )}
            {categories.length > 0 && (
                <List
                    onDeleteItemButtonClick={onOpenDeleteCategoryPopupClick}
                    onEditItemButtonClick={onOpenEditCategoryPopupClick}
                    items={categories}
                />
            )}
        </>
    );
};
