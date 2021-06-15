import React from 'react';
import { useForm, Controller } from 'react-hook-form';

export const TodosPage = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
    } = useForm({
        criteriaMode: 'all',
    });

    console.log(errors);

    const onSubmit = (data: any) => console.log(data);

    return (
        <div>
            <div className="container">задачи</div>
        </div>
    );
};
