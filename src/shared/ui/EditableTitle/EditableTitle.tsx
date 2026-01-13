import { classNames } from 'shared/lib/classNames/classNames';
import cls from './EditableTitle.module.scss';
import { ChangeEvent, useRef, useState } from 'react';

interface EditableTitleProps {
    className?: string;
    value: string | null
    onChange: (value: string) => void
    onBlur?: () => void
}

export const EditableTitle = (props: EditableTitleProps) => {
    const { className, value,
        onChange,
        onBlur
    } = props

    const [isFocused, setIsFocused] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const handleFocus = () => {
        setIsFocused(true)
    }
    const handleBlur = () => {
        setIsFocused(false)
        if (onBlur) onBlur()


    }


    return (
        <div className={classNames(cls.EditableTitle, {}, [className])}>
            <div className={cls.titleWrapper}>
                <h1 className={cls.nameDisplay}>{value}</h1>
                <input
                    className={cls.nameInput}
                    value={value ?? ''}
                    ref={inputRef}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                // onChange={(e) => updateBoardName(e.target.value)}  
                // onBlur={() => setEditing(false)} 
                />
            </div>
        </div>
    );
};