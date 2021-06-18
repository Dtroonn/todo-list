import clsx from 'clsx';
import React from 'react';
import { useForm, SubmitHandler, Controller, FieldErrors } from 'react-hook-form';
import { Category } from '../../../types/category';

import { Button } from '../../forms/Button';
import { SelectBlock } from '../../forms/SelectBlock';
import { Textarea } from '../../forms/Textarea';
import { TextField } from '../../forms/TextField';
import { PopupTemplate } from '../PopupTemplate';

import classes from './listItemPopup.module.scss';

export enum VariantsListItemPopup {
    CreateTodo = 'Создание задачи',
    EditTodo = 'Редактирование задачи',
    CreateCategory = 'Создание категории',
    EditCategory = 'Редактирование категории',
}

interface TodoPopupProps {
    open: boolean;
    variant: VariantsListItemPopup;
    categories?: Array<Category>;
    onClose?: (variant: VariantsListItemPopup) => void;
    onSubmitClick?: (variant: VariantsListItemPopup, data: any) => Promise<any>;
    defaultValues?: IForm;
}

export interface IForm {
    name: string;
    category?: number;
    description?: string;
}

const defaultValuesObj: IForm = {
    name: '',
    category: 0,
    description: '',
};

export const CreateAndEditListItemPopup: React.FC<TodoPopupProps> = ({
    open,
    variant,
    categories,
    onClose,
    onSubmitClick,
    defaultValues = defaultValuesObj,
}) => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const { handleSubmit, control, unregister, reset } = useForm<IForm>({
        defaultValues,
    });
    const [isErrors, setIsErrors] = React.useState<boolean>(false);

    const onSubmit: SubmitHandler<IForm> = async (data) => {
        setIsSubmitting(true);
        setIsErrors(false);
        if (onSubmitClick) {
            const action = await onSubmitClick(variant, data);
            if (!action?.error) {
                reset(defaultValues);
            }
        }
        setIsSubmitting(false);
    };

    const onError = (errors: FieldErrors<IForm>) =>
        setIsErrors(Boolean(Object.keys(errors).length));

    const isCategoryMode: boolean =
        variant === VariantsListItemPopup.EditCategory ||
        variant === VariantsListItemPopup.CreateCategory;

    React.useEffect(() => {
        reset(defaultValues);
        if (isCategoryMode) {
            unregister('category');
        }
    }, [isCategoryMode, open]);

    const onClosePopupClick = () => {
        if (onClose) {
            onClose(variant);
        }
    };

    const handleCancelButtonClick = (e: MouseEvent) => {
        e.preventDefault();
        onClosePopupClick();
    };

    return (
        <PopupTemplate onClose={onClosePopupClick} title={variant} open={open}>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit, onError)}>
                <div className={classes.row}>
                    <div className={clsx({ [classes.grow]: isCategoryMode }, classes.column)}>
                        <Controller
                            control={control}
                            name="name"
                            rules={{ required: true }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    readOnly={isSubmitting}
                                    id="name"
                                    error={Boolean(error)}
                                    value={value}
                                    onChange={onChange}
                                    placeholder={`Введите имя ${
                                        isCategoryMode ? 'категории' : 'задачи'
                                    }`}
                                    maxLength={255}
                                    label="Имя"
                                    triggerValidateText={isErrors}
                                    required
                                />
                            )}
                        />
                    </div>
                    {!isCategoryMode && (
                        <div className={classes.column}>
                            <Controller
                                control={control}
                                name="category"
                                render={({ field: { onChange, value } }) => (
                                    <SelectBlock
                                        disabled={isSubmitting}
                                        items={categories}
                                        onChange={onChange}
                                        placeholder="Выберите категорию"
                                        label="Категория"
                                        value={value}
                                    />
                                )}
                            />
                        </div>
                    )}
                </div>

                <div className={classes.textareaWrapper}>
                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Textarea
                                readOnly={isSubmitting}
                                id="description"
                                onChange={onChange}
                                value={value}
                                triggerValidateText={isErrors}
                                maxLength={512}
                                label="Описание"
                                placeholder={`Введите описание ${
                                    isCategoryMode ? 'категории' : 'задачи'
                                }`}
                            />
                        )}
                    />
                </div>

                <div className={classes.actions}>
                    <div className={classes.item}>
                        <Button
                            loading={isSubmitting}
                            className={classes.acceptBtn}
                            variant="primary">
                            {variant === VariantsListItemPopup.CreateTodo ||
                            variant === VariantsListItemPopup.CreateCategory
                                ? 'Создать'
                                : 'Сохранить'}
                        </Button>
                    </div>
                    <div className={classes.item}>
                        <Button
                            disabled={isSubmitting}
                            onClick={handleCancelButtonClick}
                            variant="outlined">
                            Закрыть
                        </Button>
                    </div>
                </div>
            </form>
        </PopupTemplate>
    );
};
