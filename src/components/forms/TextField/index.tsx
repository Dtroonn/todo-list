import clsx from 'clsx';
import React from 'react';

import classes from './TextField.module.scss';

interface TextFieldProps {
    maxLength?: number;
    value?: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    label?: string;
    error?: boolean;
    triggerValidateText?: boolean;
    id?: string;
    onChange?: (...event: any[]) => void;
}

export const TextField: React.FC<TextFieldProps> = ({
    required,
    error,
    triggerValidateText,
    label,
    ...props
}) => {
    return (
        <div className={classes.textField}>
            {label && (
                <label
                    htmlFor={props.id}
                    className={clsx(
                        {
                            [classes.required]: required,
                            [classes.err]: error,
                        },
                        classes.label,
                    )}>
                    {label}
                </label>
            )}
            <input
                {...props}
                type="text"
                className={clsx(
                    {
                        [classes.err]: error,
                    },
                    classes.input,
                )}
            />
            {props.maxLength && (
                <div
                    className={clsx({ [classes.show]: triggerValidateText }, classes.validateText)}>
                    Доступно {props.maxLength - (props.value ? props.value.length : 0)} символов
                </div>
            )}
        </div>
    );
};
