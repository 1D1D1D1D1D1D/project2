import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Popover.module.scss';
import { Popover as HPopover } from '@headlessui/react'
import { ReactNode } from 'react';
interface PopoverProps {
    className?: string;
    children: ReactNode;
    trigger: ReactNode;
}

export const Popover = (props: PopoverProps) => {
    const { children, className, trigger } = props
    return (
        <HPopover className={classNames(cls.Popup, {}, [className])}>
            <HPopover.Button as="div" className={cls.btn}>{trigger}</HPopover.Button>
            <HPopover.Panel className={classNames(cls.menu, {}, [])}>
                {children}
            </HPopover.Panel>
        </HPopover>
    );
};