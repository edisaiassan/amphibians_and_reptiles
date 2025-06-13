import { getSpecieDatasource } from "../../../data/remote/SpecieDatasource"

export const getSpecieProvider = async (id) => {
    const specieResult = await getSpecieDatasource(id);

    if (!specieResult.success) return specieResult;

    const {
        id: specieId,
        species,
        files,
        forestType,
        ocurrence,
        identDate,
        identTime,
        identifiers,
    } = specieResult.data;

    const images = Array.isArray(files?.images)
        ? files.images.filter((img) => img?.name?.trim() !== "").map((img) => ({
            id: img.id,
            uri: img.name,
        }))
        : [];

    const audios = Array.isArray(files?.audios)
        ? files.audios.filter((a) => a?.name?.trim() !== "").map((a) => ({
            id: a.id,
            uri: a.name,
        }))
        : [];

    const locality = ocurrence?.event?.locality;
    const district = locality?.district;
    const province = district?.province;
    const department = province?.department;
    const country = department?.country;

    return {
        specie: {
            id: specieId,
            images,
            audios,
            commonName: species?.commonName,
            scientificName: species?.scientificName,
            description: species?.description,
            status: species?.status,
            identDate,
            identTime,
            hasEggs: species?.hasEggs,
            genus: species?.genus && {
                id: species.genus.id,
                name: species.genus.name,
                status: species.genus.status,
            },
            family: species?.genus?.family && {
                id: species.genus.family.id,
                name: species.genus.family.name,
                status: species.genus.family.status,
            },
            order: species?.genus?.family?.order && {
                id: species.genus.family.order.id,
                name: species.genus.family.order.name,
                status: species.genus.family.order.status,
            },
            class: species?.genus?.family?.order?.class && {
                id: species.genus.family.order.class.id,
                name: species.genus.family.order.class.name,
                status: species.genus.family.order.class.status,
            },
            forestType: forestType && {
                id: forestType.id,
                name: forestType.name,
                status: forestType.status,
            },
            locality: locality && {
                id: locality.id,
                name: locality.name,
                status: locality.status,
            },
            country: country && {
                id: country.id,
                name: country.name,
                status: country.status,
            },
            department: department && {
                id: department.id,
                name: department.name,
                status: department.status,
            },
            province: province && {
                id: province.id,
                name: province.name,
                status: province.status,
            },
            district: district && {
                id: district.id,
                name: district.name,
                ubigeo: district.ubigeo,
                status: district.status,
            },
            event: ocurrence?.event && {
                id: ocurrence.event.id,
                latitude: parseFloat(ocurrence.event.latitude),
                longitude: parseFloat(ocurrence.event.longitude),
            },
            identifiers:
                Array.isArray(identifiers) && identifiers.length > 0
                    ? identifiers.map((identifier) => ({
                        id: identifier.id,
                        person: identifier.person && {
                            id: identifier.person.id,
                            firstname: identifier.person.firstname,
                            lastname: identifier.person.lastname,
                            email: identifier.person.email,
                            phone: identifier.person.phone,
                            ctiVitae: identifier.person.ctiVitae,
                            image: identifier.person.image,
                            status: identifier.person.status,
                        },
                    }))
                    : [],
        },
        success: true,
    };
};
