
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
    const location = useLocation();
    const isEmailVerified = authData?.emailVerified;
    const isOnVerify = location.pathname.startsWith(RoutePath.verify);
    const isOnVerifyEmail = location.pathname.startsWith(RoutePath.verifyEmail);
    const isVerifyPage = location.pathname === RoutePath.verify || location.pathname.startsWith(RoutePath.verify);
    const isVerifyEmailPage = location.pathname === RoutePath.verifyEmail || location.pathname.startsWith(RoutePath.verifyEmail);

    const searchParams = new URLSearchParams(location.search);
    const hasOobCode = searchParams.has('oobCode');
    console.log(location.pathname);
    if (isLoading) {
        return <PageLoader />
    }

    if (!authData) {
        return <Navigate to={RoutePath.signup} replace />
    }

    // verifyEmail authonly false ---> signUp не работает 

    // if (hasOobCode && isVerifyEmailPage && location.pathname === RoutePath.verifyEmail) {
    //     return <Navigate to={RoutePath.verifyEmail} replace />
    // }
    if (!isEmailVerified) {
        // но мы НЕ на страницах verify / verifyEmail / страницах с oobCode
        if (!isOnVerify && !isOnVerifyEmail && !hasOobCode) {
            return <Navigate to={RoutePath.verify} replace />;
        }
    }

    return children
};
