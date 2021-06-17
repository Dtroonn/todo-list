import React from 'react';
import { Button } from '../../forms/Button';
import { PopupTemplateProps, PopupTemplate } from '../PopupTemplate';

import classes from './confirmPopup.module.scss';

interface ConfirmPopupProps extends PopupTemplateProps {}

export const ConfirmPopup: React.FC<ConfirmPopupProps> = ({ children, ...props }) => {
    return (
        <PopupTemplate {...props}>
            <div className={classes.body}>
                <div className={classes.text}>{children}</div>
                <div className={classes.actions}>
                    <div className={classes.item}>
                        <Button className={classes.btn} variant="primary">
                            Да
                        </Button>
                    </div>
                    <div className={classes.item}>
                        <Button className={classes.btn} variant="outlined">
                            Нет
                        </Button>
                    </div>
                </div>
            </div>
        </PopupTemplate>
    );
};
