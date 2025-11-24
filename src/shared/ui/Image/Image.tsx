import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Image.module.scss';
import { ImgHTMLAttributes, ReactElement } from 'react';

type HtmlImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>
interface ImageProps extends HtmlImageProps {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
    src: string | null
}

export const Image = (props: ImageProps) => {
    const {
        className,
        src,
        alt = 'image',
        errorFallback,
        fallback,
        ...otherProps
    } = props;
    const normalizedSrc: string | undefined = src ?? undefined;
    return (
        <img src={normalizedSrc} className={classNames(cls.Image, {}, [className])} {...otherProps} />

    );
};