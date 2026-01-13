import { classNames } from 'shared/lib/classNames/classNames';
import cls from './BoardHeader.module.scss';
import { EditableTitle } from 'shared/ui/EditableTitle/EditableTitle';
import { ChangeEvent, useCallback, useState } from 'react';
import { useUpdateBoard } from 'features/Board';

interface BoardHeaderProps {
    className?: string;
    boardName: string | null
    id: string
}

export const BoardHeader = ({ className, boardName, id }: BoardHeaderProps) => {
    const [value, setValue] = useState(boardName || '');
    const updateBoard = useUpdateBoard()
    const handleChange = (newValue: string) => {
        setValue(newValue);
    };
    const onBlur = () => {
        if (value.trim() === boardName?.trim() || value.trim().length === 0) {
            if (boardName)
                setValue(boardName)
            return
        } else {
            updateBoard.mutate({ id: id, data: { boardName: value.trim() } })

        }
    }
    return (
        <div className={classNames(cls.BoardHeader, {}, [className])}>
            <div className={cls.header}>
                <EditableTitle onBlur={onBlur} onChange={handleChange} value={value} className={cls.boardName} />
            </div>
        </div>
    );
};