import { classNames } from 'shared/lib/classNames/classNames';
import cls from './EmailVerifyPage.module.scss';
import { useEffect } from 'react';
import { auth } from 'shared/config/firebase/auth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVerifyEmail } from 'features';
import { RoutePath } from 'shared/config/route/routeConfig';
import { Page } from 'shared/ui/Page/Page';
import { useSelector } from 'react-redux';
import { getUserData, useUpdateUserMutation } from 'entities/User';

interface EmailVerifyPageProps {
    className?: string;
}

export const EmailVerifyPage = ({ className }: EmailVerifyPageProps) => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const oobCode = searchParams.get('oobCode')
    const authData = useSelector(getUserData)
    const { isError, isPending, isSuccess, mutate } = useVerifyEmail()

    const [updateUser, { isLoading, error, data }] = useUpdateUserMutation();
    useEffect(() => {
        if (oobCode) {

            mutate(oobCode)
        }
    }, [oobCode])
    useEffect(() => {
        const handleSuccess = async () => {
            if (isSuccess) {
                console.log("Before reload:", auth.currentUser?.emailVerified);
                console.log("Before reload:", authData);

                await updateUser()
                console.log("After reload:", auth.currentUser?.emailVerified);
                console.log("After reload:", authData);
                navigate(RoutePath.main)
            }
        }
        handleSuccess()
    }, [isSuccess])

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
        <Page className={classNames(cls.EmailVerifyPage, {}, [className])}>
            {isSuccess && 'Verifying email'}
        </Page>
    );
};