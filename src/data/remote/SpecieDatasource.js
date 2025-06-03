import axios from 'axios';

// El dataSource resuelve la consulta a la API sin token
export const getSpeciesDatasource = async () => {

    const url = 'https://api.vertebrados.iiap.gob.pe/api/v1/individuals/query'
    const data = {
        page: 1,
        pageSize: 16,
    }
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
        });

        return {
            data: response.data.data,
            success: true,
        };
    } catch (e) {
        console.error('Error en la solicitud:', e)
        return {
            success: false,
            message: e.message,
        }
    }
}

export const getSpecieDatasource = async (id) => {
    try {
        const response = await axios.get(`https://api.vertebrados.iiap.gob.pe/api/v1/individuals/${id}`);
        return {
            data: response.data,
            success: true,
        };
    } catch (e) {
        return {
            success: false,
            message: e.message,
        };
    }
};
