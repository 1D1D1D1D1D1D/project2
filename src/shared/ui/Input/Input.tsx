import React, {
    ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import cls from './Input.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

type HtmlInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HtmlInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void
    autofocus?: boolean;
    label?: string
    readonly?: boolean
}

export const Input = memo((props: InputProps) => {
    const [, setIsFocused] = useState(false);

    const ref = useRef<HTMLInputElement>(null);
    const {
        className,
        value,
        label,
        onChange,
        placeholder,
        type = 'text',
        autofocus,
        readonly,
        ...otherProps
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const onBlur = () => {
        setIsFocused(true);
    };
    const onFocus = () => {
        setIsFocused(true);
    };

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);
    return (
        <div className='"block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"'>
            {placeholder && (
                <div className='opacity-50'>
                    {`${placeholder} `}
                </div>
            )}

            <input
                ref={ref}
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={classNames(cls.input, {}, [className])}
                onFocus={onFocus}
                onBlur={onBlur}
                readOnly={readonly}
                {...otherProps}
            />

        </div>
    );
});
