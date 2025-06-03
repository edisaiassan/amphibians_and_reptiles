import { View, StyleSheet, ScrollView, Pressable, Image, Text, ActivityIndicator } from 'react-native'
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
import { specieViewModel } from './viewModel/specieViewModel'
import { refresh } from '../../../../../global/constants/icons'
import { Icon } from '../../../../../global/components/Icon'
import MainButton from '../../../../../global/components/buttons/MainButton'
import H5 from '../../../../../global/components/texts/P'
import Table from '../../../../../global/components/Table'
import Extend from '../../../../../global/components/responsives/Extend'


export default function SpeciePage({ id }) {
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
                className='absolute top-2 left-2 z-10'
            >
                <CustomBackButton />
            </View>
            <ScrollView
                contentContainerStyle={{
                    paddingTop: insets.top,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                    paddingBottom: width > sm ? insets.bottom + 16 : insets.bottom + 96,
                }}
            >
                <Extend>
                    {loading ? <View className='w-full min-h-full flex items-center justify-center'>
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
                            : <View className={`flex ${width <= sm ? 'flex-col' : 'flex-row'}`}>
                                <View style={{
                                    maxWidth: width > sm && 468
                                }} className='border-[1px] rounded-2xl overflow-hidden border-green-500 w-full h-[354px]'>
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
                                <View className='flex-1 flex flex-col gap-2 p-4'>
                                    <View>
                                        <H3 color='text-primary'>{specie.commonName && specie.commonName.trim() !== '' ? specie.commonName : 'Sin nombre común'}</H3>
                                        <H4 className='italic' color={outlineHard}>{specie.scientificName && specie.scientificName.trim() !== '' ? specie.scientificName : 'Sin nombre científico'}</H4>
                                    </View>
                                    {
                                        specie.description && specie.description.trim() !== '' &&
                                        <P color={outlineHard}>{specie.description}</P>
                                    }
                                </View>
                                {/* <P>{specie?.genus?.family?.order?.class?.name}</P> */}
                            </View>
                    }
                    <View className={`p-4 gap-4 ${width >= lg && 'flex flex-row'}`}>
                        <View className='flex-1'>
                            <Table
                                title='Clasificación Taxonómica'
                                datas={
                                    [{
                                        title: 'Reino',
                                        description: 'Animalia'
                                    },
                                    {
                                        title: 'Clase',
                                        description: specie?.genus?.family?.order?.class?.name
                                    },
                                    {
                                        title: 'Orden',
                                        description: specie?.genus?.family?.order?.name
                                    },
                                    {
                                        title: 'Familia',
                                        description: specie?.genus?.family?.name
                                    },
                                    {
                                        title: 'Género',
                                        description: specie?.genus?.name
                                    },
                                    ]
                                }
                            />
                        </View>
                        <View className='flex-1'>
                            <Table
                                title='Clasificación Taxonómica'
                                datas={
                                    [{
                                        title: 'Reino',
                                        description: 'Animalia'
                                    },
                                    {
                                        title: 'Clase',
                                        description: specie?.genus?.family?.order?.class?.name
                                    },
                                    {
                                        title: 'Orden',
                                        description: specie?.genus?.family?.order?.name
                                    },
                                    {
                                        title: 'Familia',
                                        description: specie?.genus?.family?.name
                                    },
                                    {
                                        title: 'Género',
                                        description: specie?.genus?.name
                                    },
                                    ]
                                }
                            />
                        </View>
                    </View>
                </Extend>
            </ScrollView>
        </>
    )
}