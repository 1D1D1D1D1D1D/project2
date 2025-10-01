
import React, {
    ForwardedRef,
    memo, ReactNode, type ButtonHTMLAttributes,
} from 'react';
import cls from './Button.module.scss';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    // theme?: ThemeButton;
    square?: boolean;
    // size?: ButtonSize;
    disabled?: boolean
    children: ReactNode;

}
export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        square,
        disabled,
        ...otherProps
    } = props;

    return (
        <button
            className={className}
            {...otherProps}
            disabled={disabled}
        >
            {children}
        </button>
    );
});
export default Button;
