import React from 'react';
import { useForm, SubmitHandler, Controller, FieldErrors } from 'react-hook-form';
import { Button } from '../../forms/Button';
import { SelectBlock } from '../../forms/SelectBlock';
import { Textarea } from '../../forms/Textarea';
import { TextField } from '../../forms/TextField';
import { PopupTemplate } from '../PopupTemplate';

import classes from './todoPopup.module.scss';

interface TodoPopupProps {
    title: string;
    open: boolean;
    variant: 'edit' | 'create';
}

export interface IForm {
    name: string;
    category: string;
    description: string;
}

export const CreateAndEditTodoPopup: React.FC<TodoPopupProps> = ({ title, open, variant }) => {
    const { handleSubmit, control } = useForm<IForm>();
    const [isErrors, setIsErrors] = React.useState<boolean>(false);

    const onSubmit: SubmitHandler<IForm> = (data) => {
        console.log(data);
        setIsErrors(false);
    };

    const onError = (errors: FieldErrors<IForm>) =>
        setIsErrors(Boolean(Object.keys(errors).length));

    console.log(isErrors);

    return (
        <PopupTemplate title={title} open={open}>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit, onError)}>
                <div className={classes.row}>
                    <div className={classes.column}>
                        <Controller
                            control={control}
                            name="name"
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    id="todo-name"
                                    error={Boolean(error)}
                                    value={value}
                                    onChange={onChange}
                                    placeholder="Введите имя задачи"
                                    maxLength={255}
                                    label="Имя"
                                    triggerValidateText={isErrors}
                                    required
                                />
                            )}
                        />
                    </div>
                    <div className={classes.column}>
                        <Controller
                            control={control}
                            name="category"
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <SelectBlock
                                    onChange={onChange}
                                    placeholder="Выберите категорию"
                                    label="Категория"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className={classes.textareaWrapper}>
                    <Controller
                        control={control}
                        name="description"
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Textarea
                                id="todo-description"
                                onChange={onChange}
                                value={value}
                                triggerValidateText={isErrors}
                                maxLength={512}
                                label="Описание"
                                placeholder="Введите описание задачи"
                            />
                        )}
                    />
                </div>

                <div className={classes.actions}>
                    <div className={classes.item}>
                        <Button className={classes.acceptBtn} variant="primary">
                            {variant === 'create' ? 'Создать' : 'Сохранить'}
                        </Button>
                    </div>
                    <div className={classes.item}>
                        <Button variant="outlined">Закрыть</Button>
                    </div>
                </div>

                <button type="submit">Сохранить</button>
            </form>
        </PopupTemplate>
    );
};
