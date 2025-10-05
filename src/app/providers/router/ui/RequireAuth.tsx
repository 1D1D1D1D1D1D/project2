
import { getUserData } from 'entities/User';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/route/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';

interface RequireAuthProps {
    className?: string;
    children: ReactNode
}
export const RequireAuth = ({ children }: RequireAuthProps) => {
    const authData = useSelector(getUserData)


    if (!authData) {
        return <Navigate to={RoutePath.auth} />
    }
    return (
        children
    );
};