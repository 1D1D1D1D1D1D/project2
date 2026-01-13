import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ColumnCard.module.scss';
import { ReactNode } from 'react';

interface ColumnCardProps {
    className?: string;
    children: ReactNode
}

export const ColumnCard = ({ className, children }: ColumnCardProps) => {
    return (
        <div className={classNames(cls.ColumnCard, {}, [className])}>
            {children}
        </div>
    );
};