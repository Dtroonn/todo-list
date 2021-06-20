import React from 'react';
import { useDispatch } from 'react-redux';
import { List } from '../../components/List';
import { VariantsFormListItemPopup } from '../../components/Popups/FormListItemPopup';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setFormListItemPopup } from '../../reduxToolkit/reducers/formListItemPopup';
import { setConfirmDeleteTodoPopup } from '../../reduxToolkit/reducers/todos';
import { selectTodosWithPopulateCategory } from '../../selectors/todos';

export const TodosPage = () => {
    const todos = useTypedSelector(selectTodosWithPopulateCategory);
    const dispatch = useDispatch();

    const onOpenEditTodoPopupClick = React.useCallback((id: number) => {
        dispatch(
            setFormListItemPopup({
                isOpen: true,
                variant: VariantsFormListItemPopup.EditTodo,
                itemId: id,
            }),
        );
    }, []);

    const onOpenDeleteTodoPopupClick = React.useCallback((id: number) => {
        dispatch(setConfirmDeleteTodoPopup(true, id));
    }, []);

    return (
        <>
            {todos.length === 0 && (
                <div style={{ textAlign: 'center', fontSize: '25px' }}>
                    Список задач пуст. Добавьте какую нибудь задачу!
                </div>
            )}
            {todos.length > 0 && (
                <List
                    onDeleteItemButtonClick={onOpenDeleteTodoPopupClick}
                    onEditItemButtonClick={onOpenEditTodoPopupClick}
                    items={todos}
                />
            )}
        </>
    );
};
