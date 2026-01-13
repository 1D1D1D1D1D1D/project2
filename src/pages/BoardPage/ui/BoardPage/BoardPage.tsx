import { classNames } from 'shared/lib/classNames/classNames';
import cls from './BoardPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnapshotQuery } from 'shared/lib/hooks/useSnapshotQuery/useSnapshotQuery';
import { where } from 'firebase/firestore';
import { RoutePath } from 'shared/config/route/routeConfig';
import { Board as BoardType } from 'entities/Board/model/types/types';
import { Board } from 'widgets/Board/ui/Board/Board';
import { Column } from 'entities/Column/model/types/types';
import { Task } from 'entities/Task/model/types/types';
import { Page } from 'shared/ui/Page/Page';

interface BoardPageProps {
    className?: string;
}

const BoardPage = ({ className }: BoardPageProps) => {
    const navigate = useNavigate()
    const { boardId } = useParams<string>()
    if (!boardId) {
        navigate(RoutePath.not_found);
        return null;
    }

    const { data: board } = useSnapshotQuery<BoardType, 'document'>({
        ref: 'document',
        collectionName: 'boards',
        queryKey: ['board', boardId],
        id: boardId
    })
    const { data: columns } = useSnapshotQuery<Column, 'query'>({
        ref: 'query',
        collectionName: 'columns',
        queryKey: ['columns', boardId],
        id: boardId,
        constraints: [...[where('boardId', '==', boardId)]]
    })
    const { data: tasks } = useSnapshotQuery<Task, 'query'>({
        ref: 'query',
        collectionName: 'tasks',
        queryKey: ['tasks', boardId],
        id: boardId,
        constraints: [...[where('boardId', '==', boardId)]]
    })
    // const columns = [
    //     {
    //         id: '1',
    //         boardId: 'OIVInqdggqKA9NROBpiM',
    //         order: 1,
    //         title: 'DFSDFSFDDS'
    //     },
    //     {
    //         id: '2',
    //         boardId: 'OIVInqdggqKA9NROBpiM',
    //         order: 1,
    //         title: 'DDDDASDSAASD'
    //     }
    // ] as Column[]
    // const tasks = [
    //     {
    //         boardId: 'OIVInqdggqKA9NROBpiM',
    //         columnId: '3SYPLMnV4dr28nALU6IT',
    //         createdAt: '21321',
    //         description: 'sdadssda',
    //         order: 2,
    //         title: '12323321123',
    //         completed: true
    //     },
    //     {
    //         boardId: 'OIVInqdggqKA9NROBpiM',
    //         columnId: '3SYPLMnV4dr28nALU6IT',
    //         createdAt: '21321',
    //         description: 'sdadsdddsda',
    //         order: 3,
    //         title: '12323321123',
    //         completed: true
    //     }
    // ] as Task[]
    return (
        <Page className={classNames(cls.BoardPage, {}, [className])}>
            <Board id={boardId} board={board} columns={columns} tasks={tasks} />
        </Page>
    );
};
export default BoardPage