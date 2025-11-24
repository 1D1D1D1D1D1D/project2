import { classNames } from 'shared/lib/classNames/classNames';
import cls from './EmailVerifyPage.module.scss';
import { URL } from 'url';
import { useEffect } from 'react';
import { handleAuthAction } from 'shared/config/firebase/auth';
import { useSearchParams } from 'react-router-dom';
import { useVerifyEmail } from 'features';

interface EmailVerifyPageProps {
    className?: string;
}

export const EmailVerifyPage = ({ className }: EmailVerifyPageProps) => {
    const [searchParams] = useSearchParams()
    const oobCode = searchParams.get('oobCode')
    const { isError, isPending, mutate } = useVerifyEmail()

    useEffect(() => {
        if (oobCode) {
            mutate(oobCode)
        }
    }, [oobCode])
    if (isPending) {
        return (
            <div>Loading</div>
        )
    }
    if (isError) {
        return (
            <div>Code is expired or invalid</div>
        )
    }
    return (
        <div className={classNames(cls.EmailVerifyPage, {}, [className])}>
            Verifying email
        </div>
    );
};