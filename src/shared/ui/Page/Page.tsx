import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Page.module.scss';
import { ReactNode } from 'react';

interface PageProps {
    className?: string;
    children: ReactNode;
}

export const Page = ({ className, children }: PageProps) => {
    return (
        <div className={classNames(cls.Page, {}, [className])}>
            {children}
        </div>
    );
};