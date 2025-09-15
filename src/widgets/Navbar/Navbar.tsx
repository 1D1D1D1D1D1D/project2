
import { useSelector } from 'react-redux';
import cls from './Navbar.module.scss';
import { getUserData } from 'entities/User/model/selectors/selectors';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {

    const authData = useSelector(getUserData)
    return (
        <nav className=''>
        </nav>
    );
};