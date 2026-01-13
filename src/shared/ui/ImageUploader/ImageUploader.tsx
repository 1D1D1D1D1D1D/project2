import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ImageUploader.module.scss';
import React, { useEffect, useState } from 'react';
import { ImageMeta } from 'shared/api/cloudinary';

interface ImageUploaderProps {
    className?: string;
    enableInput?: boolean;
    enableDrop?: boolean;
    enablePaste?: boolean;
    onUpload?: (file: File) => Promise<ImageMeta>

}

export const ImageUploader = (props: ImageUploaderProps) => {
    const {
        enableDrop = true,
        enableInput = true,
        enablePaste = true,
        className,
        onUpload
    } = props
    const [src, setSrc] = useState<string | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files)
            handleFile(e.target.files[0])
    }
    const input = enableInput ? <label className={cls.fileUpload}>
        <span className={cls.uploadButton}>
            Choose a file
            <input className='hidden w-full h-full' type='file' onChange={handleFileChange} />
        </span>
    </label> : null
    useEffect(() => {
        return () => {
            if (src) URL.revokeObjectURL(src)
        }
    }, [src])
    const handleFile = (file: File) => {
        if (!file) return
        if (onUpload)
            onUpload(file)
    }


    const onDragLeave = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()
    }
    const onDragOver = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
    }
    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()

        const droppedFile = e.dataTransfer.files[0]
        setSrc(URL.createObjectURL(droppedFile))
        handleFile(droppedFile)
    }
    const handlePaste = async (e: React.ClipboardEvent<HTMLElement>) => {
        e.preventDefault()
        const item = e.clipboardData.items[0]

        if (!item) return
        if (item.kind === 'file') {
            const file = item.getAsFile()
            console.log(file);

            if (file) {

                handleFile(file)
                setSrc(URL.createObjectURL(file))

            }
        }

    }
    return (
        <div className={classNames(cls.ImageUploader, {}, [className])}
            onDrop={handleDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onPaste={handlePaste}>
            {input}
        </div>
    );
};