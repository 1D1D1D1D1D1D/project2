import { Suspense, useEffect, } from "react";
import { initAuthListener } from "shared/config/firebase/auth";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { userActions } from "entities/User/model/slice/userSlice";
import { Navbar } from "widgets/Navbar/Navbar";
import { useTheme } from "./providers/ThemeProvider";
import { classNames } from "shared/lib/classNames/classNames";
import { useSelector } from "react-redux";
import { getUserData, getUserIsLoading } from "entities/User";
import { PageLoader } from "widgets/PageLoader/PageLoader";
import { useEnsureUserUpdated } from "features";
import AppRouter from "./providers/router/ui/AppRouter";
import { addDocAuto, createDoc } from "shared/config/firebase/firestore";
import { Column } from "entities/Column/model/types/types";

const App = () => {
    const dispatch = useAppDispatch()
    const { theme, } = useTheme()
    const authData = useSelector(getUserData)
    const isLoading = useSelector(getUserIsLoading)
    const { ensureUpdated } = useEnsureUserUpdated(authData?.uid ?? null)
    // UID ИЗ REDUX САМОЕ ГЛАВНОЕ ОСТАЛЬНЫЕ ID НЕТ СМЫСЛА ХРАНИТЬ ВНУТРИ {} 
    //ПО ЦЕПОЧКЕ USESELECTOR(GETUSERDATA ) НАЧИНАЮ ДЕРГАТЬ ДАННЫЕ ХУКАМИ , ВСЕ ЗАВЯЗАННО НА ОДНОМ UID НЕ ПИСАТЬ ВНУТРИ ДАННЫХ ID 
    console.log(authData);

    useEffect(() => {
        return initAuthListener({
            onSignedIn: (u) => dispatch(userActions.setUser(u)),
            onSignedOut: () => dispatch(userActions.clearUser()),
            onVerified: (authData) => ensureUpdated(authData)
        })
    }, [])
    return (

        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback={<PageLoader />}>
                <>
                    {/* {authData?.uid && authData.emailVerified ? <Navbar /> : null} */}
                    <Navbar />

                    {isLoading ? <PageLoader /> : <AppRouter />}
                    {/* <AppRouter /> */}
                </>
            </Suspense>
        </div>
    );
};
export default App