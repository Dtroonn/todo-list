import React, { ReactNode } from 'react';
import { ReactChild } from 'react';
import { Button } from '../../forms/Button';
import { PopupTemplateProps, PopupTemplate } from '../PopupTemplate';

import classes from './confirmPopup.module.scss';

interface ConfirmPopupProps<T> extends PopupTemplateProps {
    children: ReactChild | ReactNode;
    data: T;
    loading?: boolean;
    onAcceptButtonClick: (data: T) => void;
}

export function ConfirmPopup<T>({
    children,
    data,
    onAcceptButtonClick,
    loading,
    ...props
}: ConfirmPopupProps<T>) {
    return (
        <PopupTemplate {...props}>
            <div className={classes.body}>
                <div className={classes.text}>{children}</div>
                <div className={classes.actions}>
                    <div className={classes.item}>
                        <Button
                            loading={loading}
                            onClick={() => onAcceptButtonClick(data)}
                            className={classes.btn}
                            variant="primary">
                            Да
                        </Button>
                    </div>
                    <div className={classes.item}>
                        <Button
                            disabled={loading}
                            onClick={props.onClose}
                            className={classes.btn}
                            variant="outlined">
                            Нет
                        </Button>
                    </div>
                </div>
            </div>
        </PopupTemplate>
    );
}
