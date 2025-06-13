import { getSpeciesDatasource } from '../../../data/remote/SpecieDatasource'
import { getImageSize } from '../../../global/utils/getImageSize';

export const getSpeciesProvider = async ({ query, page = 1, pageSize = 16 }) => {
    const speciesDatasourceResult = await getSpeciesDatasource({ query, page, pageSize });

    if (!speciesDatasourceResult.success) { //Cuando falla
        return {
            message: speciesDatasourceResult.message,
            success: false,
        };
    }

    if (speciesDatasourceResult.success && speciesDatasourceResult.data.length === 0) {

        return {
            species: [],
            message: speciesDatasourceResult.message,
            success: true,
        }
    }

    const speciesWithSizes = await Promise.all(
        speciesDatasourceResult.data.data.map(async (item) => {
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