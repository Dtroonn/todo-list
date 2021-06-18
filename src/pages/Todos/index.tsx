import React from 'react';
import { List } from '../../components/List';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export const TodosPage = () => {
    const todos = useTypedSelector((state) => state.todos.items);

    return (
        <>
            <List items={todos} />
        </>
    );
};
