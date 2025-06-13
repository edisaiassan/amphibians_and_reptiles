import { useCallback, useState } from 'react'
import { getSpeciesProvider } from '../../../../domain/useCases/specie/getSpeciesProvider'

export const speciesViewModel = () => {

  const [species, setSpecies] = useState([])
  const [initialLoading, setInitialLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [initialError, setInitialError] = useState(null)
  const [page, setPage] = useState(1) //posición de la página
  const [hasMore, setHasMore] = useState(true) //si hay más páginas

  const [searchText, setSearchText] = useState('')

  const onGetSpecies = useCallback(
    async ({ query = '', page = 1 }) => {
      
      if (loading || !hasMore) return

      const isFirstLoad = species.length === 0 && page === 1

      if (isFirstLoad) {
        setInitialLoading(true)
        setInitialError(null)
      }

      setError(null) // <- Limpiamos el error general ANTES de cargar
      setLoading(true)

      const speciesResult = await getSpeciesProvider({ query, page })

      if (speciesResult.success) {

        if (speciesResult.species.length === 0) {
          setHasMore(false)
        } else {
          setSpecies((prev) => page === 1 ? speciesResult.species : [...prev, ...speciesResult.species])
          setPage(page + 1)
        }
      } else {
        setError(speciesResult.message)
        if (isFirstLoad) {
          setInitialError(speciesResult.message)
        }
      }

      setLoading(false)
      setInitialLoading(false)
    },
    [loading, hasMore, species]
  )

  const onSetSearchText = (value) => {
    setSearchText(value)
  }

  const onSearchSpecies = async (query) => {
    setSpecies([])
    setPage(1)
    setHasMore(true)
    setError(null)
    setInitialError(null)
    await onGetSpecies({ query: query, page: 1 })
  }

  const onClearSearchText = async () => {
    if (searchText !== '') {
      setSearchText('')
      setSpecies([])
      setPage(1)
      setHasMore(true)
      await onGetSpecies({ query: '', page: 1 })
    }
  }

  return {
    species,
    loading,
    error,
    onGetSpecies,
    searchText,
    onSearchSpecies,
    onSetSearchText,
    onClearSearchText,
    hasMore,
    page,
    initialLoading,
    initialError
  }
}
