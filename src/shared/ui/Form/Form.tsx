import { ReactNode } from 'react';
import { DefaultValues, FieldValues, useForm, UseFormHandleSubmit } from 'react-hook-form';
import { classNames } from 'shared/lib/classNames/classNames';
interface FormProps<T extends FieldValues> {
    className?: string;
    children: ReactNode
    defaultValues: DefaultValues<T>;
    handleSubmit?: () => Promise<void>
}

export const Form = <T extends FieldValues>(props: FormProps<T>) => {
    const { children, defaultValues, handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            {children}
        </form>
    );
};