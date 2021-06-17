import clsx from 'clsx';
import React from 'react';

import classes from './textarea.module.scss';

interface TextareaProps {
    label?: string;
    maxLength?: number;
    value?: string;
    triggerValidateText?: boolean;
    placeholder?: string;
    id?: string;
    readOnly?: boolean;
    onChange?: (...event: any[]) => void;
}

export const Textarea: React.FC<TextareaProps> = ({ label, triggerValidateText, ...props }) => {
    return (
        <div className={classes.body}>
            {label && (
                <label htmlFor={props.id} className={classes.label}>
                    {label}
                </label>
            )}
            <textarea {...props} className={classes.textarea}></textarea>
            {props.maxLength && (
                <div
                    className={clsx({ [classes.show]: triggerValidateText }, classes.validateText)}>
                    Доступно {props.maxLength - (props.value ? props.value.length : 0)} символов
                </div>
            )}
        </div>
    );
};
