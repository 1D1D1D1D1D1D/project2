import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ColumnHeader.module.scss';
import { useState } from 'react';
import { EditableTitle } from 'shared/ui/EditableTitle/EditableTitle';
import MenuList from 'shared/assets/icons/listMenuButton.svg'
import { Icon } from 'shared/ui/Icon/Icon';
interface ColumnHeaderProps {
    className?: string;
    columnName: string | null
}

export const ColumnHeader = (props: ColumnHeaderProps) => {
    const { columnName, className } = props
    const [value, setValue] = useState<string>(columnName ?? '')
    const handleName = (name: string) => {
        setValue(name)
    }
    return (
        <div className={classNames(cls.ColumnHeader, {}, [className])}>
            <span className='flex'>
                <EditableTitle onChange={handleName} value={value} />
                <Icon Svg={MenuList} />
            </span>
        </div>
    );
};