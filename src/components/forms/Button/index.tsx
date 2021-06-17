import clsx from 'clsx';
import React from 'react';

import classes from './button.module.scss';

interface ButtonProps {
    variant: 'primary' | 'outlined';
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    onClick?: (...event: any[]) => void;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant,
    className,
    onClick,
    disabled,
    loading,
}) => {
    return (
        <button
            onClick={onClick}
            className={clsx(
                {
                    [classes.primary]: variant === 'primary',
                    [classes.outlined]: variant === 'outlined',
                    [classes.disabled]: disabled || loading,
                },
                classes.button,
                className,
            )}>
            {loading ? <div className={classes.loadingSpinner}></div> : children}
        </button>
    );
};
