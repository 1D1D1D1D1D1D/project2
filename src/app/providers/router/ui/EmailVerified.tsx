import { getUserData } from 'entities/User';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { routeConfig, RoutePath } from 'shared/config/route/routeConfig';

interface EmailVerifiedProps {
    children: ReactNode;
}

export const EmailVerified = ({ children }: EmailVerifiedProps) => {
    const authData = useSelector(getUserData);
    const location = useLocation();

    const isVerifyPage = location.pathname === RoutePath.verify || location.pathname.startsWith(RoutePath.verify + '/');
    const isVerifyEmailPage = location.pathname === RoutePath.verifyEmail || location.pathname.startsWith(RoutePath.verifyEmail);

    const searchParams = new URLSearchParams(location.search);
    const hasOobCode = searchParams.has('oobCode');
    // console.log(location.pathname, RoutePath.verifyEmail);
    // if (!authData) {
    //     return <Navigate to={RoutePath.signup} replace />
    // }
    // if (hasOobCode && isVerifyEmailPage && location.pathname === RoutePath.verifyEmail) {
    //     console.log('1');
    //     console.log(authData?.emailVerified === false && !hasOobCode && !isVerifyEmailPage);

    // }

    // if (authData?.emailVerified === false && !hasOobCode && !isVerifyEmailPage) {
    //     console.log('2');
    //     return <Navigate to={RoutePath.verify} replace />;
    // }

    return children;
};