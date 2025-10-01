import { classNames } from 'shared/lib/classNames/classNames';
import React, { CSSProperties, useMemo } from 'react';
import UserIcon from 'shared/assets/icons/user-svgrepo-com.svg';
import cls from './Avatar.module.scss'
import { Image } from '../Image/Image';
import { Icon } from '../Icon/Icon';
// import { Skeleton } from '../Skeleton/Skeleton';

interface AvatarProps {
    className?: string;
    src: string | null,
    size?: number
    round?: boolean
    alt?: string
}
export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        size,
        alt,
        round = false,
    } = props;

    const styles = useMemo<CSSProperties>(() => ({
        width: size,
        height: size,
    }), [size]);
    const mods: Record<string, boolean | undefined> = {
        [cls.round]: round,

    };
    const errorFallback = <Icon Svg={UserIcon} width={size} height={size} />;
    return (
        <Image errorFallback={errorFallback} src={src} alt={alt} style={styles} className={classNames(cls.Avatar, mods, [className])} />

    );
};
