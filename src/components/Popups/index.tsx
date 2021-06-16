import React from 'react';
import { CreateAndEditTodoPopup } from './CreateAndEditTodoPopup';

export const Popups: React.FC = ({ children }) => {
    return (
        <div>
            <CreateAndEditTodoPopup variant="create" title="Создание задачи" open={false} />
            <CreateAndEditTodoPopup variant="edit" title="Редактирование задачи" open={true} />
        </div>
    );
};
