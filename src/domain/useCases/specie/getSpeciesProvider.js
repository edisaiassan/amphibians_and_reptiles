import { getSpeciesDatasource } from '../../../data/remote/SpecieDatasource'
import { getImageSize } from '../../../global/utils/getImageSize';

export const getSpeciesProvider = async () => {
    const speciesDatasourceResult = await getSpeciesDatasource();

    if (!speciesDatasourceResult.success) {
        return {
            message: speciesDatasourceResult.message,
            success: false,
        };
    }

    const speciesWithSizes = await Promise.all(
        speciesDatasourceResult.data.map(async (item) => {
            const imageUrl = item.files?.images?.[0]?.name?.trim() || null;

            let aspectRatio = null;

            if (imageUrl) {
                try {
                    const size = await getImageSize(imageUrl);
                    aspectRatio = size.width / size.height;
                } catch (e) {
                    console.warn(`No se pudo obtener tamaño para la imagen: ${imageUrl}`, e);
                }
            }

            return {
                id: item.id,
                image: imageUrl,
                commonName: item.species?.commonName ?? null,
                scientificName: item.species?.scientificName ?? null,
                aspectRatio,
            };
        })
    );

    return {
        species: speciesWithSizes,
        success: true,
    }
}