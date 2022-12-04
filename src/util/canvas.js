import { AVATAR_MIME, AVATAR_SIZE } from '../constants/user';


function rotatedImageSize({ width, height }, rotation) {
    return {
        width: Math.abs(Math.cos(rotation) * width) + Math.abs(Math.sin(rotation) * height),
        height: Math.abs(Math.sin(rotation) * width) + Math.abs(Math.cos(rotation) * height),
    };
}

const createImageFromUrl = (url) => new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
});

export async function getCroppedAvatar(
    imageSrc,
    pixelCrop,
    rotationDeg,
) {
    const rotationRad = (rotationDeg * Math.PI) / 180;
    const image = await createImageFromUrl(imageSrc)
    const imageCanvas = document.createElement('canvas')
    const ctx = imageCanvas.getContext('2d')

    const resSize = rotatedImageSize(image, rotationRad);
    imageCanvas.width = resSize.width
    imageCanvas.height = resSize.height

    ctx.translate(resSize.width / 2, resSize.height / 2)
    ctx.rotate(rotationRad)
    ctx.translate(-image.width / 2, -image.height / 2)
    ctx.drawImage(image, 0, 0)

    const avatarCanvas = document.createElement('canvas')
    avatarCanvas.width = AVATAR_SIZE;
    avatarCanvas.height = AVATAR_SIZE;
    avatarCanvas.getContext('2d').drawImage(
        imageCanvas,
        pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height,
        0, 0, AVATAR_SIZE, AVATAR_SIZE
    );

    return new Promise((resolve, reject) => {
        avatarCanvas.toBlob((blob) => {
            if(!blob) {
                reject('Canvas is empty');
                return;
            }
            resolve(blob);
        }, AVATAR_MIME)
    })
}
