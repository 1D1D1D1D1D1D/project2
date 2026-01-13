import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRouteProps, routeConfig } from 'shared/config/route/routeConfig';
import { RequireAuth } from './RequireAuth';
import { PageLoader } from 'widgets/PageLoader/PageLoader';


const AppRouter = () => {

    const renderWrapper = useCallback(((route: AppRouteProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        )
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly === true ? <RequireAuth>{element}</RequireAuth> : element}
            />
        );

    }
    ), [])
    return (
        <Routes>
            {Object.values(routeConfig).map(renderWrapper)}
        </Routes>
    )
};
export default memo(AppRouter);