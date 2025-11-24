import { classNames } from 'shared/lib/classNames/classNames';
import LeftIcon from 'shared/assets/icons/trello-left.4f52d13c.svg'
import RightIcon from 'shared/assets/icons/trello-right.e6e102c7.svg'
import cls from './DecoratedBox.module.scss'
import { Icon } from 'shared/ui/Icon/Icon';
interface DecoratedBoxProps {
    className?: string;
}

export const DecoratedBox = ({ className }: DecoratedBoxProps) => {
    return (
        <div className={cls.container}>
            <Icon className={cls.left} Svg={LeftIcon} />
            <Icon className={cls.right} Svg={RightIcon} />
        </div>
    );
};