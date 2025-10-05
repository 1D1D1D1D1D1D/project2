import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginPage.module.scss';

interface LoginPageProps {
    className?: string;
}

const LoginPage = ({ className }: LoginPageProps) => {
    return (
        <div className={classNames(cls.LoginPage, {}, [className])}>
        </div>
    );
};

export default LoginPage