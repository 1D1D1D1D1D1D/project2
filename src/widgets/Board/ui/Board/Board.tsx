import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Board.module.scss';
import { Board as BoardInterface } from 'entities/Board';
import { Column } from 'entities/Column/model/types/types';
import { Task } from 'entities/Task/model/types/types';
import { ColumnCard } from '../../../../shared/ui/ColumnCard/ColumnCard';
import { TaskCard } from '../../../../shared/ui/TaskCard/TaskCard';
import { Loader } from '../../../../shared/ui/Loader/ui/Loader';
import { BoardHeader } from '../BoardHeader/BoardHeader';
import { EditableTitle } from 'shared/ui/EditableTitle/EditableTitle';
import { BoardContent } from '../BoardContent/BoardContent';

interface BoardProps {
    className?: string;
    board?: BoardInterface,
    columns?: Column[],
    tasks?: Task[]
    id: string,
}

export const Board = (props: BoardProps) => {

    const {
        className,
        board,
        columns,
        tasks,
        id
    } = props

    if (!columns || !tasks || !board) {
        return <Loader />
    }


    return (
        <div className={classNames(cls.Board, {}, [className])}>
            <BoardHeader id={id} boardName={board?.boardName} />
            <BoardContent id={id} board={board} columns={columns} tasks={tasks} />
        </div>
    );
};