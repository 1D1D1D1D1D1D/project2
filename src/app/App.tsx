import { useEffect, useState } from "react";
import { initAuthListener, loginEmailPassword, logout, signInWithGoogle, signUpEmailPassword } from "shared/config/firebase/auth";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { userActions } from "entities/User/model/slice/userSlice";
import { loginWithEmaiPassword } from "entities/User/services/loginWithEmaiPassword/loginWithEmaiPassword";
import { Input } from "shared/ui/Input/Input";
import Button from "shared/ui/Button/Button";
import { Navbar } from "widgets/Navbar/Navbar";
import { useTheme } from "./providers/ThemeProvider";
import DarkIcon from 'shared/assets/icons/darkTheme.svg'
import LightIcon from 'shared/assets/icons/lightTheme.svg'
import SystemIcon from 'shared/assets/icons/matchSystemTheme.svg'
import { classNames } from "shared/lib/classNames/classNames";
import { RadioGroup } from "shared/ui/RadioGroup/RadioGroup";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher/ui/ThemeSwitcher";
const App = () => {
    const dispatch = useAppDispatch()
    const [valueInput, setValueInput] = useState('')
    const [valueInputPw, setValueInputPw] = useState('')
    const { theme, } = useTheme()
    const login = (email: string, password: string) => {
        dispatch(loginWithEmaiPassword({ email, password }))
    }
    const reg = (email: string, password: string) => {
        signUpEmailPassword(email, password)
    }
    const google = () => {
        signInWithGoogle()
    }
    useEffect(() => {
        initAuthListener(dispatch, {
            setUser: userActions.setUser,
            clearUser: userActions.clearUser
        })
    }, [])

    const onChangeInput = (value: string) => {
        setValueInput(value)
    }
    const onChangeInputPw = (value: string) => {
        setValueInputPw(value)
    }
    const items = [
        { label: 'Light', icon: <LightIcon /> },
        { label: 'Dark', icon: <DarkIcon /> },
        { label: 'Match system', icon: <SystemIcon /> },

    ]
    return (

        <div className={classNames('app', {}, [theme])}>
            <Navbar />
            <Input value={valueInput} onChange={onChangeInput} placeholder="email" />
            <Input value={valueInputPw} onChange={onChangeInputPw} placeholder="password" />
            <Button onClick={() => reg(valueInput, valueInputPw)}>reg</Button>
            <Button onClick={() => login(valueInput, valueInputPw)}>login</Button>
            <Button onClick={logout}>logout</Button>
            <ThemeSwitcher />
        </div>
    );
};
export default App