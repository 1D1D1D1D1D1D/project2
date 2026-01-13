
import { Page } from 'shared/ui/Page/Page';
import { MyWorkspaces } from '../MyWorkspaces/MyWorkspaces';
import { useParams } from 'react-router-dom';
import { addDocAuto } from 'shared/config/firebase/firestore';
import { Task } from 'entities/Task/model/types/types';

interface MainPageProps {
    className?: string;
}

const MainPage = ({ className }: MainPageProps) => {


    return (
        <Page className='bg-blue-300'>
            {/* <ImageUploader />
            <Board /> */}
            <MyWorkspaces />
        </Page>
    );
};
export default MainPage