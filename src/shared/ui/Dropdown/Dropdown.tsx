import { Menu } from '@headlessui/react'
import { ReactNode } from 'react'
import cls from './Dropdown.module.scss'
import { classNames } from 'shared/lib/classNames/classNames';
interface DropdownItem {
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}
interface Dropdownprops {
    classname?: string,
    trigger: ReactNode;
    items: DropdownItem[];
}
export function Dropdown(props: Dropdownprops) {
    const { items, trigger, classname } = props

    return (
        <Menu as='div' className={cls.dropdown}>

            <Menu.Button className='w-9 h-8'>
                {trigger}
            </Menu.Button>
            <Menu.Items as='div' className={classNames(cls.menu, {}, [])}>
                {items.map((item, index) => (
                    item.onClick ?
                        <li className={cls.item} key={item.href}>
                            <button onClick={item.onClick} className={cls.btnContent}>
                                {item.content}
                            </button>
                        </li>
                        :
                        <li className={cls.item} key={item.href} >
                            <div className={cls.textContent}>
                                {item.content}
                            </div>
                        </li>
                ))}


            </Menu.Items>
        </Menu>
    )
}
