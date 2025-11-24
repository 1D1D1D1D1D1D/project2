import { classNames } from 'shared/lib/classNames/classNames';

interface MainPageProps {
    className?: string;
}

const MainPage = ({ className }: MainPageProps) => {
    return (
        <div className='bg-red-500 h-10 w-full h-full'>
            MAIN PAGE
        </div>
    );
};
export default MainPage