import { getSpecieDatasource } from "../../../data/remote/SpecieDatasource"

export const getSpecieProvider = async (id) => {
    const specieResult = await getSpecieDatasource(id)
    if (specieResult.success) {
        const { id, species, files } = specieResult.data

        const images =
            Array.isArray(files?.images) &&
            files.images
                .filter(img => img?.name?.trim() !== '')
                .map(img => ({ id: img.id, uri: img.name }));

        return {
            specie: {
                id: id,
                images: images,
                commonName: species?.commonName,
                scientificName: species?.scientificName,
                description: species?.description,
                status: species?.status,
                genus: species?.genus
            },
            success: specieResult.success
        }
    } else {
        return specieResult
    }
}