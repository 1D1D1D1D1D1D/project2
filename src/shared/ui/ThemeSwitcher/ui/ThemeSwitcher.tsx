import cls from './ThemeSwitcher.module.scss';
import Button from 'shared/ui/Button/Button';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import ArrowIcon from 'shared/assets/icons/arrow.svg'
import { Icon } from 'shared/ui/Icon/Icon';
import { Popover } from 'shared/ui/Popover/Popover';
import DarkIcon from 'shared/assets/icons/darkTheme.svg'
import LightIcon from 'shared/assets/icons/lightTheme.svg'
import SystemIcon from 'shared/assets/icons/matchSystemTheme.svg'
import { RadioGroup } from 'shared/ui/RadioGroup/RadioGroup';
interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT

    const { theme, toggleTheme } = useTheme()

    const trigger = (
        <Button className='w-full'>
            < span className='flex justify-between w-full items-center ' >
                <span>Theme</span>
                <span className=''><Icon Svg={ArrowIcon} className={cls.icon} /></span>
            </span >
        </Button >
    )
    const changeTheme = (value: Theme) => {
        toggleTheme(value)
    }

    const items = [
        { label: 'Light', icon: <LightIcon className='rounded-lg mr-3' />, value: Theme.LIGHT, changeTheme },
        { label: 'Dark', icon: <DarkIcon className='rounded-lg mr-3' />, value: Theme.DARK, changeTheme },
        { label: 'Match system', icon: <SystemIcon className='rounded-lg mr-3' />, value: systemTheme, changeTheme },
    ]
    return (
        <Popover trigger={trigger} className={cls.Popover} >
            <section>
                <div className={cls.radioGroup} >
                    <RadioGroup items={items} />
                </div>
            </section>
        </Popover>
    );
};