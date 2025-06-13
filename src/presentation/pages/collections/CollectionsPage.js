import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, View, ScrollView, TouchableOpacity } from 'react-native'
import MasonryList from '@react-native-seoul/masonry-list'
import { useRouter, useLocalSearchParams, usePathname } from 'expo-router'
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context'
import { breakpoints } from '../../../global/constants/breakpoints'
import GridCard from '../../../global/components/cards/GridCard'
import InputGlass from '../../../global/components/inputs/InputGlass'
import { speciesViewModel } from './viewModel/collectionsViewModel'
import { closeMini, filter, refresh, search } from '../../../global/constants/icons'
import P from '../../../global/components/texts/P'
import { Icon } from '../../../global/components/Icon'
import BlurSafeArea from '../../../global/components/BlurSafeArea'
import Popover from 'react-native-popover-view'
import FakeIconButton from '../../../global/components/buttons/FakeIconButton'
import FilterSection from '../../../global/sections/FilterSection'
import MainButton from '../../../global/components/buttons/MainButton'
import IconButton from '../../../global/components/buttons/IconButton'
import MessageSection from '../../../global/sections/MessageSection'


export default function CollectionsPage() {
  const {
    species,
    loading,
    error,
    onGetSpecies,
    searchText,
    onSetSearchText,
    onClearSearchText,
    page,
    initialLoading,
    initialError,
    onSearchSpecies,
    hasMore
  } = speciesViewModel();
  const { width } = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const pathname = usePathname()
  const searchParams = useLocalSearchParams()

  const { xs, sm, md, lg, xxl } = breakpoints

  const getNumColumns = () => {
    if (width < xs) return 1;
    if (width < sm) return 2;
    if (width < md) return 3;
    if (width < lg) return 4;
    return 5;
  };

  const numColumns = getNumColumns();
  const double8 = 8;
  const double4 = 4;
  const double56 = 56;

  // Estilo centralizado para márgenes
  const scrollPadding = {
    paddingTop: 68.5 + insets.top,
    paddingHorizontal: 16,
    paddingLeft: width > sm ? insets.left + 100.3 : insets.left + 11.9,
    paddingBottom: insets.bottom + (width >= md ? double8 : 100.8),
    paddingRight: 11.9 + insets.right,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    gap: double8
  }

  const onGoDetail = (id) => router.push(`/collection/${id}`)

  const popoverRef = useRef()
  const [visibleFilter, setVisibleFilter] = useState(true)

  const switchFilter = () => {
    setVisibleFilter(!visibleFilter)
  }

  const onHandleScroll = (event) => {
    if (!hasMore || loading) return; // ⛔️ Evita fetch si ya no hay más o si está cargando

    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    const isCloseToBottom =
      contentSize.height - contentOffset.y <= layoutMeasurement.height + 16;

    if (isCloseToBottom) {
      onGetSpecies({ query: typeof searchTerm === 'string' ? searchTerm.trim() : '', page });
    }
  }

  //Capturando el path para obtener el searchTerm
  const { searchTerm } = useLocalSearchParams()
  //Seteando el searchTerm
  const onSearchAndSetPathSpecies = () => {
    const term = searchText.trim();
    if (!term) return;

    router.replace({
      pathname: '/collection', // 👈 estás en esta misma ruta
      params: {
        searchTerm: encodeURIComponent(term),
      },
    });

    onSearchSpecies(term); // 👈 ejecuta tu lógica de búsqueda
  }

  const onClearSearchAndSetPath = () => {
    onClearSearchText(); // limpia el estado interno
    router.replace('/collection')
  }


  useEffect(() => {
    if (typeof searchTerm === 'string' && searchTerm.trim() !== '') {
      onSetSearchText(searchTerm)
      onSearchSpecies(searchTerm)
    } else {
      onGetSpecies({ query: '', page: 1 }) // carga inicial sin búsqueda
    }
  }, [])

  return (
    <>
      <BlurSafeArea />
      <View
        className='flex flex-row flex-1'
      >
        <View className=' flex-1'>
          <View
            className='absolute z-10'
            style={[{
              top: insets.top + 4,
              left: width > sm ? insets.left + 103.3 : insets.left + 11.9,
            }, floatingStyle]}
          >
            <View className='bg-primary px-2 py-2 rounded-2xl flex flex-row gap-2'>
              <P className='text-white'>{page}</P>
              <P className='text-white'>{`${pathname} hasMore: ${hasMore}, ${new URLSearchParams(searchParams).toString()}`}</P>
            </View>
            <InputGlass style={maxWidthFilter}
              rightChild={
                <>
                  {
                    searchText.trim().length > 0 &&
                    (<IconButton
                      gradientColors={['#00000000']}
                      path={closeMini}
                      onPress={onClearSearchAndSetPath}
                    />)
                  }
                  (<IconButton
                    gradientColors={searchText.trim().length > 0 ? undefined : ['#00000000']}
                    path={search}
                    onPress={searchText.trim().length > 0 ? () => onSearchAndSetPathSpecies() : undefined}
                  />)
                  {
                    width < xxl ?
                      (<Popover
                        ref={popoverRef}
                        popoverStyle={{
                          backgroundColor: '#00000000',
                        }}
                        from={(
                          <TouchableOpacity>
                            <FakeIconButton path={filter} />
                          </TouchableOpacity>
                        )}>
                        <FilterSection
                          onClose={() => popoverRef.current.requestClose()}
                        />
                      </Popover>
                      ) : (
                        <IconButton
                          path={filter}
                          gradientColors={visibleFilter === true ? ['#00000000'] : undefined}
                          onPress={switchFilter}
                        />
                      )
                  }
                </>
              }
              hintText='Buscar'
              onChange={(e) => onSetSearchText(e.nativeEvent.text)}
              value={searchText}
            />
          </View>
          {
            initialLoading ? (
              <ScrollView contentContainerStyle={scrollPadding}>
                <ActivityIndicator size={double56} color='#3B6939' />
              </ScrollView>
            ) : initialError ? (
              <MessageSection
                scrollPadding={scrollPadding}
                message={error}
                onPress={() => onGetSpecies({ query: typeof searchTerm === 'string' && searchTerm.trim() })}
              />
            )
              : species.length < 1 ? (
                <MessageSection
                  scrollPadding={scrollPadding}
                  message={`😁 ${error}`}
                  onPress={() => onGetSpecies({ query: typeof searchTerm === 'string' && searchTerm.trim() })}
                />
              ) :
                (
                  <MasonryList
                    onRefresh={() => onGetSpecies({ query: typeof searchTerm === 'string' && searchTerm.trim(), page: 1 })}
                    data={species}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={width >= xxl ? (visibleFilter === true ? numColumns : 6) : numColumns}
                    contentContainerStyle={[scrollPadding, { columnGap: 8 }]}
                    ListFooterComponent={
                      loading && species.length > 0 ? (
                        <ActivityIndicator size={double56} color='#3B6939' />
                      ) : error && species.length > 0 ? (
                        <View className='gap-2'>
                          <P className='text-center'>{error}</P>
                          <MainButton
                            leftChild={<Icon path={refresh} />}
                            onPress={() => {
                              onGetSpecies({ query: typeof searchTerm === 'string' ? searchTerm.trim() : '', page })
                            }}>Reintentar</MainButton>
                        </View>
                      ) : null
                    }
                    onScroll={onHandleScroll}
                    scrollEventThrottle={400}
                    renderItem={({ item }) => (
                      <GridCard
                        onPress={() => onGoDetail(item.id)}
                        style={{ marginBottom: double8, marginRight: double4, marginLeft: double4 }}
                        image={item.image}
                        title={item.commonName}
                        subtitle={item.scientificName}
                        aspectRatio={item.aspectRatio}
                      />
                    )}
                  />
                )
          }
        </View>
        {/* Filtro pantalla muy larga */}
        {width >= xxl && visibleFilter === true &&
          <View style={[filterStyle, filterStyle]}>
            <FilterSection hiddenVertical={switchFilter} />
          </View>}
      </View>
    </>
  )
}

const maxWidthFilter = { maxWidth: 448 }

const filterStyle = { width: 322 }

const floatingStyle = {
  right: 16,
  alignItems: 'center'
}