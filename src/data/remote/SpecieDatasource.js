import axios from 'axios'

// El dataSource resuelve la consulta a la API sin token
export const getSpeciesDatasource = async ({ query, page = 1, pageSize = 16 }) => {

    const url = `${process.env.MAIN_URL}/query`
    const data = {
        page,
        pageSize,
        ...(query && { searchTerm: query })
    }
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
        })

        if (response.data.data.length < 1) {
            return {
                data: [],
                message: 'No se ha encontrado resultados',
                success: true,
            }
        }

        return {
            data: response.data,
            success: true,
        };
    } catch (e) {
        return {
            success: false,
            message: e.message,
        }
    }
}

export const getSpecieDatasource = async (id) => {
    try {
        const response = await axios.get(`${process.env.MAIN_URL}/${id}`);
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
