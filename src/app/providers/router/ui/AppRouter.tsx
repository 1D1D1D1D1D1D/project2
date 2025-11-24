import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRouteProps, routeConfig } from 'shared/config/route/routeConfig';
import { RequireAuth } from './RequireAuth';
import { EmailVerified } from './EmailVerified';


export const AppRouter = () => {

    const renderWrapper = ((route: AppRouteProps) => {
        let element = (
            <Suspense>
                {route.element}
            </Suspense>
        )
        if (route.authOnly) {
            element = <RequireAuth>{element}</RequireAuth>;
        }

        if (route.emailVerifiedOnly) {

            element = <EmailVerified>{element}</EmailVerified>;
        }

        return (
            <Route
                key={route.path}
                path={route.path}
                element={element}
            />
        );
    }
        // function App() {
        //   const [isLoggedIn, setIsLoggedIn] = useState(false);
        //   const [isLoading, setIsLoading] = useState(true);


        //   useEffect(() => {
        //     // Check if user is already logged in
        //     async function checkLogin() {
        //       try {
        //         const userToken = await AsyncStorage.getItem('userToken');
        //         setIsLoggedIn(!!userToken);
        //       } finally {
        //         setIsLoading(false);
        //       }
        //     }

        //     checkLogin();
        //   }, []);
        //   if (isLoading) {
        //     return <LoadingScreen />;
        //   }
        //   return (
        //     <NavigationContainer>
        //       {isLoggedIn ? (
        //         // Show main app screens
        //         <MainStack />
        //       ) : (
        //         // Show login screens
        //         <AuthStack />
        //       )}
        //     </NavigationContainer>
        //   );
        // }
    )
    return (
        <Routes>
            {Object.values(routeConfig).map(renderWrapper)}
        </Routes>
    )
};