

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dglfbebre'
export interface ImageMeta {
    url: string,
    public_id: string
    width: number
    height: number
    format: string
    delete_token: string
}
export const uploadImage = async (file: File): Promise<ImageMeta> => {

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'imgpreset')
    formData.append('cloud_name', 'dglfbebre')

    const res = await fetch(CLOUDINARY_URL + '/image/upload', {
        method: 'POST',
        body: formData
    })

    const data: ImageMeta = await res.json()
    console.log(data);

    const imageMeta: ImageMeta = {
        url: data.url,
        public_id: data.public_id,
        width: data.width,
        height: data.height,
        format: data.format,
        delete_token: data.delete_token
    };
    console.log(imageMeta);

    return imageMeta
}

export const deleteImage = async (deleteToken: string): Promise<void> => {
    try {
        await fetch(CLOUDINARY_URL + '/delete_by_token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: deleteToken
            })
        })

    } catch (error) {
        console.error('Error delete image', error)
    }
}