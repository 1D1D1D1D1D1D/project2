
import { useSelector } from 'react-redux';
import cls from './Navbar.module.scss';
import Button from 'shared/ui/Button/Button';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Image } from 'shared/ui/Image/Image';
import { getUserData } from 'entities/User';
import { AccountMenu } from 'features/AccountMenu/ui/AccountMenu';
import { logout } from 'shared/config/firebase/auth';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { memo } from 'react';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {

    const authData = useSelector(getUserData)
    return (
        <nav className={cls.navbar}>
            {authData ? (

                <div>

                    <Dropdown items={[
                        { content: <AccountMenu />, },
                        { content: <ThemeSwitcher /> },
                        { content: 'Выйти', onClick: logout },
                    ]} trigger={<Avatar size={24} src={authData.photoURL} />} />

                </div>
            ) :
                (<div className={cls.links}>
                    <Button >
                        asddas
                    </Button>
                </div>)
            }
        </nav>
    );
});