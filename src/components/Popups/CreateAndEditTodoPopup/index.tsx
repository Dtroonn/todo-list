import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { TextField } from '../../forms/TextField';
import { PopupTemplate } from '../PopupTemplate';

import classes from './todoPopup.module.scss';

interface TodoPopupProps {
    title: string;
    open: boolean;
}

export interface IForm {
    name: string;
    description: string;
    lala: string;
}

export const CreateAndEditTodoPopup: React.FC<TodoPopupProps> = ({ title, open }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IForm>();

    console.log('ERRORS', errors);

    const onSubmit: SubmitHandler<IForm> = (data) => console.log(data);

    const isSomeError = Object.keys(errors);

    React.useEffect(() => {
        console.log(isSomeError.length);
    }, [isSomeError]);

    return (
        <PopupTemplate title={title} open={open}>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="name"
                    defaultValue=""
                    rules={{ required: 'lalka' }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            value={value}
                            onChange={onChange}
                            placeholder="Введите имя задачи"
                            maxLength={20}
                            label="Имя"
                            required
                        />
                    )}
                />

                <button type="submit">Сохранить</button>
            </form>
        </PopupTemplate>
    );
};
