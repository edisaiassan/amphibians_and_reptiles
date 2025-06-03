import { useState } from 'react'
import { getSpeciesProvider } from '../../../../domain/useCases/specie/getSpeciesProvider'

export const speciesViewModel = () => {

    const [species, setSpecies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [imageSizes, setImageSizes] = useState({});

    const onGetSpecies = async () => {
        setLoading(true)
        if (error !== null) {
            setError(null)
        }

        const speciesResult = await getSpeciesProvider()

        if (speciesResult.success) {
            setSpecies(speciesResult.species)
        } else {
            setError(speciesResult.message)
        }
        setLoading(false)
    }

    return { species, loading, error, onGetSpecies }
}