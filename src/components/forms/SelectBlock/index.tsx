import clsx from 'clsx';
import React, { SyntheticEvent } from 'react';

import classes from './selectBlock.module.scss';

const items: Array<any> = [
    { name: 'Задача1', value: 'Zadacha1' },
    { name: 'Задача2', value: 'Zadacha2' },
    { name: 'Задача3', value: 'Zadacha3' },
    { name: 'Задача4', value: 'Zadacha4' },
];

const emptyOptionText = 'Не выбрано';

interface SelectBlockProps {
    label?: string;
    placeholder?: string;
    onChange?: (...event: any[]) => void;
}

export const SelectBlock: React.FC<SelectBlockProps> = ({ placeholder, label, onChange }) => {
    const [selectedValue, setSelectedValue] = React.useState<string | number>('');
    const [open, setOpen] = React.useState<boolean>(false);
    const selectRef = React.useRef(null);

    const toggleOpen = () => setOpen((open) => !open);

    let titleText = selectedValue
        ? items.find((item) => item.value === selectedValue).name
        : placeholder
        ? placeholder
        : emptyOptionText;

    const onSelectValue = (value: string | number) => {
        setSelectedValue(value);
        setOpen(false);
        if (onChange) {
            onChange(value);
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
        <div ref={selectRef} className={classes.selectBlock}>
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
                            onClick={() => onSelectValue(item.value)}>
                            {item.name}
                        </li>
                    ))}
                    <li className={classes.listItem} onClick={() => onSelectValue('')}>
                        {emptyOptionText}
                    </li>
                </ul>
            </div>
        </div>
    );
};
