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
    const isVerifyPage = location.pathname === RoutePath.verify;
    const isVerifyEmailPage = location.pathname === RoutePath.verifyEmail;

    // Эти две страницы НЕ должны требовать подтверждённого email
    if (isVerifyPage || isVerifyEmailPage) {
        return children;
    }

    if (!authData?.emailVerified) {
        return <Navigate to={RoutePath.verify} replace />;
    }

    return children;
};