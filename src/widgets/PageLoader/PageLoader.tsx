import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/Loader/ui/Loader';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => {
    return (
        <div>
            <Loader />
        </div>
    );
};