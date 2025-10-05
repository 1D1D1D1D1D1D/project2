

import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRouteProps, routeConfig } from 'shared/config/route/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { RequireAuth } from './RequireAuth';


export const AppRouter = () => {

    const renderWrapper = ((route: AppRouteProps) => {
        const element = (

            <Suspense>
                {route.element}
            </Suspense>
        )
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
            />
        );
    }
    )
    return (
        <Routes>
            {Object.values(routeConfig).map(renderWrapper)}
        </Routes>
    )
};