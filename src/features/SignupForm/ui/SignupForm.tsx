import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SignupForm.module.scss';
import { Form } from 'shared/ui/Form/Form';
import { FieldValues, useForm } from 'react-hook-form';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { loginEmailPassword } from 'shared/config/firebase/auth';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { registerWithEmailPassword } from 'entities/User';
interface SignupFormProps {
    className?: string;
}
export type FormValues = {
    email: string
    password: string
}

export const SignupForm = ({ className }: SignupFormProps) => {
    const { register, handleSubmit } = useForm<FormValues>({})
    const dispatch = useAppDispatch()
    const values: FieldValues = {
        'email': '',
        'password': ''
    }

    const onSubmit = handleSubmit((value) =>
        dispatch(registerWithEmailPassword({ email: value.email, password: value.password }))
    )
    return (
        <div className={classNames(cls.SignupForm, {}, [className])}>
            <Form defaultValues={values} handleSubmit={onSubmit} >
                <>
                    <h1 className={cls.label}>Sign up to continue</h1>
                    <div>
                        <label>
                            Email<span>*</span>
                        </label>
                        <div className='rounded-sm border border-[color:var(--ds-border-input)]  focus-within:border-[color:var(--ds-border-focused)] focus-within:border-2 h-10 mb-4 '>
                            <input {...register('email')} className={cls.input}
                                placeholder="Enter your email" required />

                        </div>
                    </div>
                    <div>
                        <label>
                            Password<span>*</span>
                        </label>
                        <div className='rounded-sm border border-[color:var(--ds-border-input)]  focus-within:border-[color:var(--ds-border-focused)] focus-within:border-2 h-10 mb-4 '>
                            <input type='password' {...register('password')} className={cls.input}
                                placeholder="Password" required />

                        </div>
                    </div>

                    <button className={cls.submitBtn} type='submit'>Sign up</button>
                </>
            </Form>
        </div>
    );
};