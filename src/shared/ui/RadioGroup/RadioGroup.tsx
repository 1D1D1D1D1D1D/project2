import { classNames } from 'shared/lib/classNames/classNames';
import { RadioGroup as Group } from '@headlessui/react'
import { ReactElement, ReactNode, useState } from 'react';
import { Input } from '../Input/Input';
import cls from './RadioGroup.module.scss'
import Checked from 'shared/assets/icons/redio-checked.svg'
import Unchecked from 'shared/assets/icons/radio-button-unchecked.svg'
import Button from '../Button/Button';
import { Theme } from 'app/providers/ThemeProvider';
interface RadioInputItems {
    label: string
    icon?: ReactElement
    value: Theme
    changeTheme: (theme: Theme) => void
}
interface RadioInputProps {
    className?: string;
    items: RadioInputItems[]
}

export const RadioGroup = (props: RadioInputProps) => {
    const { className, items } = props
    return (
        <Group >
            {items.map((item) => (
                <Group.Option key={item.label} value={item}
                >
                    {({ active, checked }) => (
                        <Button className={classNames(cls.btn, {}, [checked ? cls.btnChecked : ''])} onClick={() => item.changeTheme(item.value)}>
                            <div>
                                {checked ? <Checked className={cls.checked} /> : <Unchecked className={cls.unchecked} />}
                            </div>
                            {item.icon && <div >
                                {item.icon}
                            </div>}
                            {item.label &&
                                <Group.Label as='p' >
                                    {item.label}
                                </Group.Label>
                            }
                        </Button>
                    )}
                </Group.Option>
            ))}
        </Group>
    )
};