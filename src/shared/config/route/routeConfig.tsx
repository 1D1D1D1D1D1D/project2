import { type RouteProps } from 'react-router-dom';
import { ReactNode } from 'react';
import { MainPage } from 'pages/MainPage';
import { LoginPage } from 'pages/LoginPage';
export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
    element?: ReactNode;
};

export enum AppRoutes {
    MAIN = 'main',
    PROFILE = 'profile',
    AUTHORISATION = 'auth',
    // BOARD = 'board'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.PROFILE]: '/profile/',
    [AppRoutes.AUTHORISATION]: '/auth'

}
export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath[AppRoutes.MAIN],
        element: <MainPage />,
        authOnly: true
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath[AppRoutes.PROFILE],
        authOnly: true,
    },
    [AppRoutes.AUTHORISATION]: {
        path: RoutePath[AppRoutes.AUTHORISATION],
        authOnly: false,
        element: <LoginPage />
    },
};