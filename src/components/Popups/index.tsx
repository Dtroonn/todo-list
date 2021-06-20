import React from 'react';
import { shallowEqual, useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setConfirmDeleteCategoryPopup } from '../../reduxToolkit/reducers/categories';

import { setFormListItemPopup } from '../../reduxToolkit/reducers/formListItemPopup';
import { setConfirmDeleteTodoPopup } from '../../reduxToolkit/reducers/todos';
import {
    createCategory,
    deleteCategory,
    updateCategory,
} from '../../reduxToolkit/thunks/categories';
import { createTodo, deleteTodo, updateTodo } from '../../reduxToolkit/thunks/todos';
import { selectCategories } from '../../selectors/categories';
import { ConfirmDeleteListItemPopupData } from '../../types/common';
import { ConfirmPopup } from './ConfirmPopup';
import {
    FormListItemPopup,
    FormListItemPopupValues,
    VariantsFormListItemPopup,
} from './FormListItemPopup';

export const Popups: React.FC = ({ children }) => {
    const dispatch = useDispatch();
    const { categories, formListItemPopup, confirmDeleteTodoPopup, confirmDeleteCategoryPopup } =
        useTypedSelector(
            (state) => ({
                categories: selectCategories(state),
                formListItemPopup: state.formListItemPopup,
                confirmDeleteTodoPopup: state.todos.confirmDeleteTodoPopup,
                confirmDeleteCategoryPopup: state.categories.confirmDeleteCategoryPopup,
            }),
            shallowEqual,
        );

    const handleCreateAndEditListItemPopupClose = React.useCallback(
        (variant: VariantsFormListItemPopup): void => {
            dispatch(
                setFormListItemPopup({
                    isOpen: false,
                }),
            );
        },
        [],
    );

    const handleListItemPopupSubmit = React.useCallback(
        (
            variant: VariantsFormListItemPopup,
            data: FormListItemPopupValues,
            id: number = 0,
        ): void => {
            if (variant === VariantsFormListItemPopup.CreateTodo) {
                console.log(data);
                dispatch(createTodo(data));
            }
            if (variant === VariantsFormListItemPopup.CreateCategory) {
                console.log(id);
                dispatch(createCategory(data));
            }

            if (variant === VariantsFormListItemPopup.EditCategory) {
                dispatch(
                    updateCategory({
                        id,
                        data,
                    }),
                );
            }

            if (variant === VariantsFormListItemPopup.EditTodo) {
                dispatch(
                    updateTodo({
                        id,
                        data,
                    }),
                );
            }
        },
        [],
    );

    const onDeleteTodoClick = (data: ConfirmDeleteListItemPopupData) => {
        dispatch(deleteTodo(data.id));
    };

    const onCloseConfirmDeleteTodoPopup = () => {
        dispatch(setConfirmDeleteTodoPopup(false));
    };

    const onDeleteCategoryClick = (data: ConfirmDeleteListItemPopupData) => {
        dispatch(deleteCategory(data.id));
    };

    const onCloseConfirmDeleteCategoryPopup = () => {
        dispatch(setConfirmDeleteCategoryPopup(false));
    };

    return (
        <div>
            <FormListItemPopup
                variant={formListItemPopup.variant}
                open={formListItemPopup.isOpen}
                onClose={handleCreateAndEditListItemPopupClose}
                onSubmitClick={handleListItemPopupSubmit}
                categories={categories}
                defaultValues={formListItemPopup.defaultValues}
                itemId={formListItemPopup.itemId}
                loading={formListItemPopup.state}
            />
            <ConfirmPopup
                loading={confirmDeleteTodoPopup.isLoading}
                onAcceptButtonClick={onDeleteTodoClick}
                data={confirmDeleteTodoPopup.data}
                title="Удаление задачи"
                onClose={onCloseConfirmDeleteTodoPopup}
                open={confirmDeleteTodoPopup.isOpen}>
                {`Вы уверены, что хотите удалить задачу “${confirmDeleteTodoPopup.data.name}”?`}
            </ConfirmPopup>
            <ConfirmPopup
                onClose={onCloseConfirmDeleteCategoryPopup}
                onAcceptButtonClick={onDeleteCategoryClick}
                loading={confirmDeleteCategoryPopup.isLoading}
                data={confirmDeleteCategoryPopup.data}
                open={confirmDeleteCategoryPopup.isOpen}
                title="Удаление категории">
                {`Вы уверены, что хотите удалить категорию “${confirmDeleteCategoryPopup.data.name}”?`}
            </ConfirmPopup>
        </div>
    );
};
