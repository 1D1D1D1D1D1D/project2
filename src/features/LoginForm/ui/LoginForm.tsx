import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { Input } from 'shared/ui/Input/Input';
import Button from 'shared/ui/Button/Button';
import { logout, signInWithGoogle, signUpEmailPassword } from 'shared/config/firebase/auth';
import { loginWithEmaiPassword } from 'entities/User/services/loginWithEmaiPassword/loginWithEmaiPassword';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { getUserData } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
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
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <h1>Log in to continue</h1>
            <form action="">
                <div>
                    <label htmlFor="">Email</label>
                    <Input value={valueInput} onChange={onChangeInput} />
                </div>

                <ul>

                </ul>
            </form>

            <Input value={valueInputPw} onChange={onChangeInputPw} placeholder="password" />
            <Button onClick={() => reg(valueInput, valueInputPw)}>reg</Button>
            <Button onClick={() => login(valueInput, valueInputPw)}>login</Button>
            <Button onClick={logout}>logout</Button>a
        </div>
    );
};