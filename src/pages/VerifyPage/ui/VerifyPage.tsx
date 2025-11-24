import { classNames } from 'shared/lib/classNames/classNames';
import cls from './VerifyPage.module.scss';
import { sendEmailVerify } from 'shared/config/firebase/auth';
import { getUserData, User } from 'entities/User';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Image } from 'shared/ui/Image/Image';
import Img from 'shared/assets/icons/letter.png'
import Button from 'shared/ui/Button/Button';
interface VerifyPageProps {
    className?: string;
}

const VerifyPage = ({ className }: VerifyPageProps) => {
    const authData = useSelector(getUserData)
    useEffect(() => {
        if (authData?.emailVerified === false) {
            // sendEmailVerify<User>(authData)
        }
    }, [])
    return (
        <div className={classNames(cls.VerifyPage, {}, [className])}>
            <div className={cls.verify} >
                <div className={cls.verifyBox}>
                    <Image src={Img} />
                    <h2 className={cls.verifyLabel}>Let's verify your email</h2>
                    <p className='font-normal text-sm'>We sent a verification link to:</p>
                    <p className='mb-1.5 font-normal text-sm' ><strong>{authData?.email}</strong></p>
                    <Button onClick={() => sendEmailVerify(authData)} className={cls.resendBtn}>Resend</Button>
                </div>
            </div>

        </div>
    );
};
export default VerifyPage