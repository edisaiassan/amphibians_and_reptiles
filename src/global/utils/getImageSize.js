import { Image } from 'react-native'

export const getImageSize = (url) => {
    return new Promise((resolve, reject) => {
        if (!url) {
            reject(new Error('URL inválida'));
            return;
        }

        Image.getSize(
            url,
            (width, height) => resolve({ width, height }),
            (error) => reject(error)
        );
    });
};