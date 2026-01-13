import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NotFoundPage.module.scss';
import { Page } from 'shared/ui/Page/Page';

interface NotFoundPageProps {
    className?: string;
}

const NotFoundPage = ({ className }: NotFoundPageProps) => {
    return (
        <Page className={classNames(cls.NotFoundPage, {}, [className])}>
            <h1 className='mb-6 text-2xl'>Page not found.</h1>
            <p className='text-lg'>This page may be private. If someone gave you this link, you may need to be a board or Workspace member to access it.</p>
        </Page>
    );
};

export default NotFoundPage