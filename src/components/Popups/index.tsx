import { PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setIsOpenCreateCategoryPopup } from '../../reduxToolkit/reducers/categories';
import { setIsOpenCreateTodoPopup } from '../../reduxToolkit/reducers/todos';
import { createCategory } from '../../reduxToolkit/thunks/categories';
import { Category } from '../../types/category';
import { Todo } from '../../types/todo';
import { ConfirmPopup } from './ConfirmPopup';
import {
    CreateAndEditListItemPopup,
    IForm,
    VariantsListItemPopup,
} from './CreateAndEditListItemPopup';

export const Popups: React.FC = ({ children }) => {
    const dispatch = useDispatch();
    const { isOpenCreateTodoPopup, isOpenCreateCategoryPopup, categories } = useTypedSelector(
        (state) => ({
            isOpenCreateTodoPopup: state.todos.isOpenCreatePopup,
            isOpenCreateCategoryPopup: state.categories.isOpenCreatePopup,
            categories: state.categories.items,
        }),
    );

    //Определяем какой вариант popup будет открыт(удаление/редактирование, категорий/задач)
    let variant: VariantsListItemPopup = VariantsListItemPopup.CreateTodo;
    if (isOpenCreateTodoPopup) {
        variant = VariantsListItemPopup.CreateTodo;
    }
    if (isOpenCreateCategoryPopup) {
        variant = VariantsListItemPopup.CreateCategory;
    }
    /////////////////////////////////////////////////////////////////////////////////

    const handleCreateAndEditListItemPopupClose = (variant: VariantsListItemPopup): void => {
        if (variant === VariantsListItemPopup.CreateTodo) {
            dispatch(setIsOpenCreateTodoPopup(false));
        }
        if (variant === VariantsListItemPopup.CreateCategory) {
            dispatch(setIsOpenCreateCategoryPopup(false));
        }
    };

    const onCreateListItemClick = async (
        variant: VariantsListItemPopup,
        data: IForm,
    ): Promise<any> => {
        if (variant === VariantsListItemPopup.CreateTodo) {
            console.log(data);
            // dispatch(setIsOpenCreateTodoPopup(false));
        }
        if (variant === VariantsListItemPopup.CreateCategory) {
            return dispatch(createCategory(data));
        }
    };

    return (
        <div>
            <CreateAndEditListItemPopup
                variant={variant}
                open={isOpenCreateTodoPopup || isOpenCreateCategoryPopup}
                onClose={handleCreateAndEditListItemPopupClose}
                onSubmitClick={onCreateListItemClick}
                categories={categories}
            />
            <ConfirmPopup title="Удаление задачи" open={false}>
                Вы уверены, что хотите удалить задачу “Задача1”?
            </ConfirmPopup>
            <ConfirmPopup title="Удаление категории" open={false}>
                Вы уверены, что хотите удалить категорию “Категория1”?
            </ConfirmPopup>
        </div>
    );
};
