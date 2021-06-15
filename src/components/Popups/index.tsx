import React from 'react';
import { CreateAndEditTodoPopup } from './CreateAndEditTodoPopup';

export const Popups: React.FC = ({ children }) => {
    return (
        <div>
            <CreateAndEditTodoPopup title="Создание задачи" open={true} />
        </div>
    );
};
