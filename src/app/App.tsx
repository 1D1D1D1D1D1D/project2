import { useEffect, useState } from "react";
import { initAuthListener, loginEmailPassword, logout, signInWithGoogle, signUpEmailPassword } from "shared/config/firebase/auth";
import cls from './App2.module.scss'
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { CounterActions } from "entities/Counter/ui/model/slice/counterSlice";
import { useSelector } from "react-redux";
import { counterValue } from "entities/Counter/ui/model/selector/seletors";
import { userActions } from "entities/User/model/slice/userSlice";
import { loginWithEmaiPassword } from "entities/User/services/loginWithEmaiPassword/loginWithEmaiPassword";
import { Input } from "shared/ui/Input/Input";
import Button from "shared/ui/Button/Button";
const App = () => {
    const dispatch = useAppDispatch()
    const [valueInput, setValueInput] = useState('')
    const [valueInputPw, setValueInputPw] = useState('')
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

    return (

        <div className={cls.app}>

            <Input value={valueInput} onChange={onChangeInput} placeholder="email" />
            <Input value={valueInputPw} onChange={onChangeInputPw} placeholder="password" />
            <Button onClick={() => reg(valueInput, valueInputPw)}>reg</Button>
            <Button onClick={() => login(valueInput, valueInputPw)}>login</Button>
            <Button onClick={logout}>logout</Button>
        </div>
    );
};
export default App