import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SignupPage.module.scss';
import { Form } from 'shared/ui/Form/Form';
import { useForm } from 'react-hook-form';
import { SignupForm } from 'features/SignupForm/ui/SignupForm';
import { DecoratedBox } from './DecoratedBox/DecoratedBox';
import { SocialLogin } from 'features/SocialLogin/ui/SocialLogin';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User';
import { RoutePath } from 'shared/config/route/routeConfig';
import { Page } from 'shared/ui/Page/Page';

interface SignupPageProps {
    className?: string;
}

const SignupPage = ({ className }: SignupPageProps) => {
    const authData = useSelector(getUserData);
    const navigate = useNavigate();

    useEffect(() => {
        if (authData) {
            navigate(RoutePath.main, { replace: true });
        }
    }, [authData, navigate]);
    return (
        <Page className={cls.page}>
            <div className={cls.whitebox}>
                <div className={cls.main}>
                    <SignupForm className={cls.card} />
                    <SocialLogin />
                </div>

            </div>
            <DecoratedBox />
        </Page >
    );
};
export default SignupPage