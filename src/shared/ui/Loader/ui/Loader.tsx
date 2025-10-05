import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Loader.module.scss'
import LoaderIcon from 'shared/assets/icons/loader.svg'
interface LoaderProps {
    className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
    return (
        <LoaderIcon />
    );
};