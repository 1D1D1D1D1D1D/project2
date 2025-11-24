
import { getUserData, getUserIsLoading } from 'entities/User';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/route/routeConfig';
import { PageLoader } from 'widgets/PageLoader/PageLoader';
interface RequireAuthProps {
    className?: string;
    children: ReactNode
}
export const RequireAuth = ({ children }: RequireAuthProps) => {
    const authData = useSelector(getUserData)
    const isLoading = useSelector(getUserIsLoading)

    if (isLoading) {
        return <PageLoader />
    }


    if (!authData) {
        return <Navigate to={RoutePath.signup} replace />
    }
    return (
        children
    );
};



// if (location.pathname === RoutePath.verify) {
//     return children
// }
// if (authData?.emailVerified === false) {
//     return <Navigate to={RoutePath.main} replace />
// }
// if (
//     authData.emailVerified === true
//     &&
//     !isLoading
// ) {
//     return <Navigate to={RoutePath.main} replace />;
// }