import clsx from 'clsx';
import React from 'react';

import classes from './selectBlock.module.scss';

const emptyOptionText = 'Не выбрано';

interface SelectBlockProps {
    label?: string;
    placeholder?: string;
    items?: Array<any>;
    disabled?: boolean;
    onChange?: (...event: any[]) => void;
}

export const SelectBlock: React.FC<SelectBlockProps> = ({
    placeholder,
    label,
    items = [],
    disabled,
    onChange,
}) => {
    const [selectedValue, setSelectedValue] = React.useState<string | number>('');
    const [open, setOpen] = React.useState<boolean>(false);
    const selectRef = React.useRef<HTMLDivElement>(null);

    const toggleOpen = () => setOpen((open) => !open);

    let titleText = selectedValue
        ? items.find((item) => item.id === selectedValue).name
        : placeholder
        ? placeholder
        : emptyOptionText;

    const onSelectValue = (id: string | number) => {
        setSelectedValue(id);
        setOpen(false);
        if (onChange) {
            onChange(id);
        }
    };

    React.useEffect(() => {
        const handleOutsideClick = (e: MouseEvent): void => {
            const path = e.composedPath();

            if (!path.includes(selectRef.current as unknown as EventTarget)) {
                setOpen(false);
            }
        };
        document.body.addEventListener('click', handleOutsideClick);
        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div
            ref={selectRef}
            className={clsx({ [classes.disabled]: disabled }, classes.selectBlock)}>
            <div className={classes.body}>
                <div onClick={toggleOpen} className={classes.header}>
                    <div
                        className={clsx(
                            { [classes.placeholder]: !Boolean(selectedValue) },
                            classes.title,
                        )}>
                        {titleText}
                    </div>
                    <div className={classes.icon}>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 4L8 12L16 4H0Z" fill="#3F72AF" />
                        </svg>
                    </div>
                    {label && <div className={classes.label}>{label}</div>}
                </div>
                <ul className={clsx({ [classes.open]: open }, classes.list)}>
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className={classes.listItem}
                            onClick={() => onSelectValue(item.id)}>
                            {item.name}
                        </li>
                    ))}
                    <li className={classes.listItem} onClick={() => onSelectValue(0)}>
                        {emptyOptionText}
                    </li>
                </ul>
            </div>
        </div>
    );
};
