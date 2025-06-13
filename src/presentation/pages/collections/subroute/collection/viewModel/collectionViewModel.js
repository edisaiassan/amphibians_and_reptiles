import { useState } from 'react'
import { getSpecieProvider } from '../../../../../../domain/useCases/specie/getSpecieProvider'

export const specieViewModel = () => {
    const [specie, setSpecie] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const onGetSpecie = async (id) => {
        
        setLoading(true)
        if (error !== null) {
            setError(null)
        }

        const specieResult = await getSpecieProvider(id)

        if (specieResult.success) {
            setSpecie(specieResult.specie)
        } else {
            setError(specieResult.message)
        }
        setLoading(false)
    }

    return { specie, loading, error, onGetSpecie }
}