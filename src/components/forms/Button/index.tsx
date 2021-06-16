import clsx from 'clsx';
import React from 'react';

import classes from './button.module.scss';

interface ButtonProps {
    variant: 'primary' | 'outlined';
    className?: string;
    onClick?: (...event: any[]) => void;
}

export const Button: React.FC<ButtonProps> = ({ children, variant, className, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={clsx(
                {
                    [classes.primary]: variant === 'primary',
                    [classes.outlined]: variant === 'outlined',
                },
                classes.button,
                className,
            )}>
            {children}
        </button>
    );
};
