import clsx from 'clsx';
import React, { ChangeEventHandler } from 'react';

import classes from './TextField.module.scss';

interface TextFieldProps {
    maxLength?: number;
    value?: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    label?: string;
    onChange: (...event: any[]) => void;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    ({ required, ...props }, ref) => {
        return (
            <div className={classes.textField}>
                {props.label && (
                    <label
                        htmlFor=""
                        className={clsx({
                            [classes.label]: true,
                            [classes.required]: required,
                        })}>
                        {props.label}
                    </label>
                )}
                <input ref={ref} {...props} type="text" className={classes.input} />
                {props.maxLength && (
                    <div className={classes.validateText}>
                        Доступно {props.maxLength - (props.value ? props.value.length : 0)} символов
                    </div>
                )}
            </div>
        );
    },
);
