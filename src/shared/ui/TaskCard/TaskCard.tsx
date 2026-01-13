import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TaskCard.module.scss';
import { ReactNode } from 'react';
import RadioButton from 'shared/assets/icons/radioButton.svg'
import Button from '../Button/Button';
import { Icon } from '../Icon/Icon';
interface TaskCardProps {
    className?: string;
    children: ReactNode
}
export const TaskCard = ({ className, children }: TaskCardProps) => {
    return (
        <div className={classNames(cls.TaskCard, {}, [className])}>
            <div className='pr-3 pt-1 pb-1 flex justify-center items-center'>
                <Button className={cls.taskDoneBtn}>
                    <Icon className={cls.icon} Svg={RadioButton} />
                </Button>
                <div className={cls.text}>{children}</div>
            </div>
        </div>
    );
};