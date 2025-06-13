import { View, StyleSheet, ScrollView, Pressable, Image, ActivityIndicator } from 'react-native'
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context'
import ImageViewing from 'react-native-image-viewing'
import { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import H3 from '../../../../../global/components/texts/H3'
import H4 from '../../../../../global/components/texts/H4'
import P from '../../../../../global/components/texts/P'
import { breakpoints } from '../../../../../global/constants/breakpoints'
import CustomBackButton from '../../../../../global/components/buttons/CustomBackButton'
import CarouselSlider from '../../../../../global/components/CarouselSlider'
import { specieViewModel } from './viewModel/collectionViewModel'
import { clock, locationFill, refresh } from '../../../../../global/constants/icons'
import { Icon } from '../../../../../global/components/Icon'
import MainButton from '../../../../../global/components/buttons/MainButton'
import Table from '../../../../../global/components/Table'
import Extend from '../../../../../global/components/responsives/Extend'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'


export default function CollectionPage({ id }) {
    const { specie, loading, error, onGetSpecie } = specieViewModel();
    const { width } = useSafeAreaFrame();
    const { sm, lg } = breakpoints;
    const insets = useSafeAreaInsets();

    const [visible, setIsVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const outlineHard = 'text-outlineHard'

    useEffect(() => {
        onGetSpecie(id);
    }, [id]);

    return (
        <>
            <View
                style={{
                    paddingTop: insets.top,
                    paddingLeft: insets.left,
                    paddingRight: insets.right
                }}
                className={`absolute top-2 py-2 z-10 ${width > sm ? 'left-9' : 'left-2'}`}
            >
                <CustomBackButton shadow={true} />
            </View>
            <ScrollView
                contentContainerStyle={{
                    paddingTop: insets.top,
                    paddingLeft: width > sm ? insets.left + 86 : insets.left,
                    paddingRight: insets.right,
                    paddingBottom: width > sm ? insets.bottom + 16 : insets.bottom + 96,
                    flexGrow: 1
                }}
            >
                <Extend>
                    {
                        loading ? <View className='w-full min-h-full items-center justify-center'>
                            <ActivityIndicator size={56} color='#3B6939' />
                        </View>
                            : error
                                ? <View className='w-full min-h-full flex items-center justify-center gap-2'>
                                    <P className='text-center'>{error}</P>
                                    <MainButton
                                        onPress={() => onGetSpecie(id)}
                                        leftChild={
                                            <Icon
                                                path={refresh}
                                            />
                                        }
                                    >Actualizar</MainButton>
                                </View>
                                :
                                <View>
                                    <View className={`flex ${width <= sm ? 'flex-col' : 'flex-row'}`}>
                                        <View style={{
                                            maxWidth: width > sm && 468
                                        }} className='border rounded-2xl overflow-hidden border-primary w-full h-[354px]'>
                                            <LinearGradient
                                                colors={['#C8E8ECA0', '#77969AA0', '#5E7C80A0', '#466367A0']}
                                                locations={[0, 0.5, 0.75, 1]}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 0, y: 1 }}
                                                style={StyleSheet.absoluteFill}
                                            />
                                            <CarouselSlider>
                                                {Array.isArray(specie.images) && specie.images.length > 0
                                                    ? specie.images.map((image, index) => (
                                                        <Pressable
                                                            key={image.id}
                                                            onPress={() => {
                                                                setCurrentIndex(index);
                                                                setIsVisible(true);
                                                            }}
                                                        >
                                                            <Image
                                                                className='w-full h-full'
                                                                source={{ uri: image.uri }}
                                                                resizeMode='contain'
                                                            />
                                                        </Pressable>
                                                    ))
                                                    : null}
                                            </CarouselSlider>
                                            <ImageViewing
                                                images={specie.images != null ? specie.images : []}
                                                imageIndex={currentIndex}
                                                visible={visible}
                                                onRequestClose={() => setIsVisible(false)}
                                            />
                                        </View>
                                        <View className='flex-1 flex flex-col gap-2 px-4 py-2'>
                                            <View>
                                                <H3 color='text-primary'>{specie.commonName && specie.commonName.trim() !== '' ? specie.commonName : 'Sin nombre común'}</H3>
                                                <H4 className='italic' color={outlineHard}>{specie.scientificName && specie.scientificName.trim() !== '' ? specie.scientificName : 'Sin nombre científico'}</H4>
                                            </View>
                                            <View className='items-end'>
                                                <MainButton rightChild={<Icon path={clock} />}
                                                >{`Identificación: ${specie.identDate} ${specie.identTime}`}</MainButton>
                                            </View>
                                            {
                                                specie.description && specie.description.trim() !== '' &&
                                                <P color={outlineHard}>{specie.description}</P>
                                            }
                                        </View>
                                    </View>
                                    <View className={`px-4 py-2 gap-2 ${width >= lg && 'flex flex-row'}`}>
                                        <View className='flex-1 gap-2'>
                                            {specie?.class &&
                                                <Table
                                                    title='Clasificación taxonómica'
                                                    datas={[
                                                        { title: 'Reino', description: 'Animalia' },
                                                        { title: 'Clase', description: specie?.class?.name || '-' },
                                                        { title: 'Orden', description: specie?.order?.name || '-' },
                                                        { title: 'Familia', description: specie?.family?.name || '-' },
                                                        { title: 'Género', description: specie?.genus?.name || '-' },
                                                    ]}
                                                />
                                            }
                                            <Table
                                                title='Datos morfológicos'
                                                datas={[
                                                    {
                                                        title: 'Ovíparo',
                                                        description:
                                                            specie?.hasEggs === true
                                                                ? 'Sí'
                                                                : 'No',
                                                    },
                                                ]}
                                            />
                                            <Table
                                                title='Localidad y hábitat'
                                                datas={
                                                    [
                                                        {
                                                            title: 'Localidad',
                                                            description: specie?.locality?.name !== null ? specie?.locality?.name : '-'
                                                        },
                                                        {
                                                            title: 'País / Departamento / Provincia / Distrito / Ubigeo',
                                                            description: `${specie?.country?.name || '-'} / ${specie?.department?.name || '-'} / ${specie?.province?.name || '-'} / ${specie?.district?.name || '-'} / ${specie?.district?.ubigeo || '-'}`
                                                        },
                                                        {
                                                            title: 'Tipo de bosque',
                                                            description: `${specie?.forestType?.name || '-'}`
                                                        }
                                                    ]
                                                }
                                            />
                                        </View>
                                        <View className='flex-1 gap-2'>
                                            <Table
                                                title='Datos de identificación'
                                                datas={
                                                    specie?.identifiers?.map((identifier, index) => ({
                                                        title: `${index + 1}: Nombre / Correo / Teléfono`,
                                                        description: `${identifier?.person?.firstname || '-'} ${identifier?.person?.lastname || '-'} / ${identifier?.person?.email || '-'} / ${identifier?.person?.phone || '-'}`
                                                    })) || [
                                                        {
                                                            title: 'No se ha encontrado indetificador',
                                                            description: '-'
                                                        }
                                                    ]
                                                }
                                            />
                                            {specie?.event?.latitude != null && specie?.event?.longitude != null && (
                                                <View className='rounded-2xl overflow-hidden'>
                                                    <MapView
                                                        style={mapStyle}
                                                        initialRegion={{
                                                            latitude: specie.event.latitude,
                                                            longitude: specie.event.longitude,
                                                            latitudeDelta: 0.0922,
                                                            longitudeDelta: 0.0421,
                                                        }}
                                                    >
                                                        <Marker
                                                            coordinate={{
                                                                latitude: specie.event.latitude,
                                                                longitude: specie.event.longitude,
                                                            }}>
                                                            <Icon
                                                                path={locationFill}
                                                                iconColor='#dc2626'
                                                            />
                                                        </Marker>
                                                    </MapView>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </View>
                    }
                </Extend>
            </ScrollView>
        </>
    )
}

const mapStyle = {
    width: '100%',
    height: 448,
}