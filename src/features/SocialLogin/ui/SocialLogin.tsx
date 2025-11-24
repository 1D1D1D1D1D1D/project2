import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SocialLogin.module.scss';
import GoogleIcon from 'shared/assets/icons/google-logo.5867462c.svg'
import { signInWithGoogle } from 'shared/config/firebase/auth';
import { Icon } from 'shared/ui/Icon/Icon';
import { RoutePath } from 'shared/config/route/routeConfig';
import { loginWithGoogle } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface SocialLoginProps {
    className?: string;
}

export const SocialLogin = (props: SocialLoginProps) => {
    const { className } = props
    const dispatch = useAppDispatch()
    const items = [
        { label: 'Google', icon: <Icon Svg={GoogleIcon} />, onClick: loginWithGoogle() }
    ]

    return (
        <div className={classNames(cls.SocialLogin, {}, [className])}>
            <p className='text-center mb-2.5 opacity-70'>Or continue with:</p>
            <ul>

                {items.map(item => (
                    <li key={item.label}>
                        <button className={cls.btn} onClick={() => dispatch(item.onClick)}>
                            <span className='w-6 h-6 mr-1.5'>{item.icon}</span>
                            <span className={cls.label}>{item.label}</span>
                        </button>
                    </li>
                ))}

            </ul>
        </div>
    );
};