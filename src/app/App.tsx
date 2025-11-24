import { Suspense, useEffect, } from "react";
import { initAuthListener, logout } from "shared/config/firebase/auth";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { userActions } from "entities/User/model/slice/userSlice";
import { Navbar } from "widgets/Navbar/Navbar";
import { useTheme } from "./providers/ThemeProvider";
import { classNames } from "shared/lib/classNames/classNames";
import { AppRouter } from "./providers/router/ui/AppRouter";
import { useSelector } from "react-redux";
import { getUserData } from "entities/User";
import { PageLoader } from "widgets/PageLoader/PageLoader";
import { useEnsureUserUpdated } from "features";
import { useLocation } from "react-router-dom";

const App = () => {
    const dispatch = useAppDispatch()
    const { theme, } = useTheme()
    const authData = useSelector(getUserData)
    const { ensureUpdated } = useEnsureUserUpdated(authData?.uid ?? null)

    console.log(authData);

    useEffect(() => {
        return initAuthListener({
            onSignedIn: (u) => dispatch(userActions.setUser(u)),
            onSignedOut: () => dispatch(userActions.clearUser()),
            onVerified: (authData) => ensureUpdated(authData)
        })
    }, [dispatch])
    return (

        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback={<PageLoader />}>
                <>
                    {/* {authData?.uid && authData.emailVerified ? <Navbar /> : null} */}
                    <Navbar />
                    <AppRouter />
                </>
            </Suspense>
        </div>
    );
};
export default App