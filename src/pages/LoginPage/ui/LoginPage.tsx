import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginPage.module.scss';
import { Input } from 'shared/ui/Input/Input';
import Button from 'shared/ui/Button/Button';
import { logout, signInWithGoogle, signUpEmailPassword } from 'shared/config/firebase/auth';
import { loginWithEmaiPassword } from 'entities/User/services/loginWithEmaiPassword/loginWithEmaiPassword';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserData } from 'entities/User';
import { Page } from 'shared/ui/Page/Page';

interface LoginPageProps {
    className?: string;
}

const LoginPage = ({ className }: LoginPageProps) => {
    const dispatch = useAppDispatch()
    const [valueInput, setValueInput] = useState('')
    const [valueInputPw, setValueInputPw] = useState('')
    const authData = useSelector(getUserData)
    const login = (email: string, password: string) => {
        dispatch(loginWithEmaiPassword({ email, password }))
    }
    const reg = (email: string, password: string) => {
        signUpEmailPassword(email, password)
    }
    const google = () => {
        signInWithGoogle()
    }
    const onChangeInput = (value: string) => {
        setValueInput(value)
    }
    const onChangeInputPw = (value: string) => {
        setValueInputPw(value)
    }

    return (
        <Page className={classNames(cls.LoginPage, {}, [className])}>
            LOGIN PAGE
            <Input value={valueInput} onChange={onChangeInput} placeholder="email" />
            <Input value={valueInputPw} onChange={onChangeInputPw} placeholder="password" />
            <Button onClick={() => reg(valueInput, valueInputPw)}>reg</Button>
            <Button onClick={() => login(valueInput, valueInputPw)}>login</Button>
            <Button onClick={logout}>logout</Button>a
        </Page>
    );
};

export default LoginPage