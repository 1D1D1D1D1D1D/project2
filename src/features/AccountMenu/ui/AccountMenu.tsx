import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AccountMenu.module.scss';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User/model/selectors/selectors';
import { Avatar } from 'shared/ui/Avatar/Avatar';

interface AccountMenuProps {
    className?: string;
}

export const AccountMenu = ({ className }: AccountMenuProps) => {
    const authData = useSelector(getUserData)

    return (
        <div className={classNames(cls.AccountMenu, {}, [className])}>
            <h2 className='text-left text-sm'>ACCOUNT</h2>
            <div className='flex max-w-full p-2' >
                <div className='mr-2 w-10 h-10'>
                    <Avatar className='w-full h-full' src={authData?.photoURL ?? null} />
                </div>
                <div>
                    <div className='mt-0.5'>{authData?.displayName}</div>
                    <div className='overflow-hidden overflow-ellipsis whitespace-nowrap'>{authData?.email}</div>
                </div>
            </div>
        </div>
    );
};