import { type RouteProps } from 'react-router-dom';
import { ReactNode } from 'react';
import { MainPage } from 'pages/MainPage';
import { LoginPage } from 'pages/LoginPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { SignupPage } from 'pages/SignupPage';
import { VerifyPage } from 'pages/VerifyPage';
import { EmailVerifyPage } from 'pages/EmailVerifyPage/ui/EmailVerifyPage';
import { ProfilePage } from 'pages/ProfilePage/ProfilePage';
import { BoardPage } from 'pages/BoardPage';
export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
    element?: ReactNode;
    emailVerifiedOnly?: boolean
};

export enum AppRoutes {
    MAIN = 'main',
    PROFILE = 'profile',
    LOGIN = 'login',
    SIGNUP = 'signup',
    VERIFY = 'verify',
    VERIFY_EMAIL = 'verifyEmail',
    BOARD = 'board',
    NOT_FOUND = 'not_found'

}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.PROFILE]: '/profile/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.SIGNUP]: '/signup',
    [AppRoutes.VERIFY]: '/verify',
    [AppRoutes.VERIFY_EMAIL]: '/verifyEmail',
    [AppRoutes.BOARD]: '/board/',
    [AppRoutes.NOT_FOUND]: '*'

}
export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath[AppRoutes.MAIN],
        element: <MainPage />,
        authOnly: true,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath[AppRoutes.PROFILE],
        authOnly: true,
        element: <ProfilePage />
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath[AppRoutes.LOGIN],
        authOnly: false,
        element: <LoginPage />
    },
    [AppRoutes.SIGNUP]: {
        path: RoutePath[AppRoutes.SIGNUP],
        authOnly: false,
        element: <SignupPage />
    },
    [AppRoutes.VERIFY]: {
        path: RoutePath[AppRoutes.VERIFY],
        authOnly: true,
        element: <VerifyPage />,

    },

    [AppRoutes.VERIFY_EMAIL]: {
        path: RoutePath[AppRoutes.VERIFY_EMAIL],
        authOnly: true,
        element: <EmailVerifyPage />,

    },
    [AppRoutes.BOARD]: {
        path: `${RoutePath[AppRoutes.BOARD]}:boardId`,
        authOnly: true,
        element: <BoardPage />
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath[AppRoutes.NOT_FOUND],
        authOnly: false,
        element: <NotFoundPage />
    },
};