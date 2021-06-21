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

export enum VariantsFormListItemPopup {
    CreateTodo = 'Создание задачи',
    EditTodo = 'Редактирование задачи',
    CreateCategory = 'Создание категории',
    EditCategory = 'Редактирование категории',
}

export enum FormListItemPopupState {
    Loading = 'loading',
    Success = 'success',
    Default = 'default',
}

interface TodoPopupProps {
    open: boolean;
    variant?: VariantsFormListItemPopup;
    categories?: Array<Category>;
    onClose?: (variant: VariantsFormListItemPopup) => void;
    onSubmitClick?: (variant: VariantsFormListItemPopup, data: any, id?: number) => void;
    defaultValues?: FormListItemPopupValues;
    itemId?: number;
    loading?: FormListItemPopupState;
}

export interface FormListItemPopupValues {
    name: string;
    category?: number;
    description?: string;
}

const defaultValuesObj: FormListItemPopupValues = {
    name: '',
    category: 0,
    description: '',
};

export const FormListItemPopup: React.FC<TodoPopupProps> = React.memo(
    ({
        open,
        variant = VariantsFormListItemPopup.CreateTodo,
        categories,
        onClose,
        onSubmitClick,
        defaultValues = defaultValuesObj,
        itemId,
        loading,
    }) => {
        const { handleSubmit, control, unregister, reset } = useForm<FormListItemPopupValues>({
            defaultValues,
        });
        const [isErrors, setIsErrors] = React.useState<boolean>(false);

        const onSubmit: SubmitHandler<FormListItemPopupValues> = (data) => {
            setIsErrors(false);
            if (onSubmitClick) {
                onSubmitClick(variant, data, itemId);
            }
        };

        const onError = (errors: FieldErrors<FormListItemPopupValues>) =>
            setIsErrors(Boolean(Object.keys(errors).length));

        const isCategoryMode: boolean =
            variant === VariantsFormListItemPopup.EditCategory ||
            variant === VariantsFormListItemPopup.CreateCategory;

        const isEditMode: boolean =
            variant === VariantsFormListItemPopup.EditCategory ||
            variant === VariantsFormListItemPopup.EditTodo;

        React.useEffect(() => {
            reset(defaultValues);
            if (isCategoryMode) {
                unregister('category');
            }
        }, [isCategoryMode, open]);

        React.useEffect(() => {
            if (loading === FormListItemPopupState.Success && !isEditMode) {
                reset(defaultValues);
            }
        }, [loading]);

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
                                        readOnly={loading === FormListItemPopupState.Loading}
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
                                            disabled={loading === FormListItemPopupState.Loading}
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
                                    readOnly={loading === FormListItemPopupState.Loading}
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
                                loading={loading === FormListItemPopupState.Loading}
                                className={classes.acceptBtn}
                                variant="primary">
                                {variant === VariantsFormListItemPopup.CreateTodo ||
                                variant === VariantsFormListItemPopup.CreateCategory
                                    ? 'Создать'
                                    : 'Сохранить'}
                            </Button>
                        </div>
                        <div className={classes.item}>
                            <Button
                                disabled={loading === FormListItemPopupState.Loading}
                                onClick={handleCancelButtonClick}
                                variant="outlined">
                                Закрыть
                            </Button>
                        </div>
                    </div>
                </form>
            </PopupTemplate>
        );
    },
);
