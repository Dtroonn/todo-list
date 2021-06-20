import clsx from 'clsx';
import React from 'react';

import classes from './popupTemplate.module.scss';

export interface PopupTemplateProps {
    open: boolean;
    title: string;
    contentClassName?: string;
    onClose?: () => void;
}

export const PopupTemplate: React.FC<PopupTemplateProps> = ({
    open,
    title,
    contentClassName,
    children,
    onClose,
}) => {
    const isFirstTimeDidMountRef = React.useRef(false);

    React.useEffect(() => {
        if (open) {
            document.body.classList.add('lock');
            return;
        }
        if (!open && isFirstTimeDidMountRef.current) {
            setTimeout(() => {
                document.body.classList.remove('lock');
            }, 400);
        }
        isFirstTimeDidMountRef.current = true;
    }, [open]);

    return (
        <div
            onClick={onClose}
            className={clsx({
                [classes.popup]: true,
                [classes.active]: open,
            })}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={clsx(
                    {
                        [classes.active]: open,
                    },
                    contentClassName,
                    classes.content,
                )}>
                <div className={classes.title}>{title}</div>
                <div className={classes.body}>{children}</div>
                <button onClick={onClose} className={classes.closeButton}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.96 12.0007L23.3847 4.57603C24.205 3.75568 24.205 2.42568 23.3847 1.60661L22.3949 0.616803C21.5743 -0.203807 20.2443 -0.203807 19.4252 0.616803L12.0007 8.04126L4.57603 0.615265C3.75568 -0.205088 2.42568 -0.205088 1.60661 0.615265L0.615265 1.60507C-0.205088 2.42568 -0.205088 3.75568 0.615265 4.57475L8.04126 12.0007L0.616803 19.4252C-0.203807 20.2458 -0.203807 21.5758 0.616803 22.3949L1.60661 23.3847C2.42696 24.205 3.75696 24.205 4.57603 23.3847L12.0007 15.96L19.4252 23.3847C20.2458 24.205 21.5758 24.205 22.3949 23.3847L23.3847 22.3949C24.205 21.5743 24.205 20.2443 23.3847 19.4252L15.96 12.0007Z"
                            fill="#3F72AF"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};
