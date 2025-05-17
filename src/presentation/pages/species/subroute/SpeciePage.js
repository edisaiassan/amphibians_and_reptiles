import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native'
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context'
import CustomBackButton from '../../../global/components/buttons/CustomBackButton'
import ImageViewing from 'react-native-image-viewing'
import { useState } from 'react'
import CarouselSlider from '../../../global/components/CarouselSlider'
import { LinearGradient } from 'expo-linear-gradient'
import { breakpoint } from '../../../global/constants/breakpoint'
import H3 from '../../../global/components/texts/H3'
import H4 from '../../../global/components/texts/H4'
import P from '../../../global/components/texts/P'


export default function SpeciePage({ specieId }) {

    const { width } = useSafeAreaFrame()
    const { lg } = breakpoint;
    const insets = useSafeAreaInsets();

    const images = [
        { uri: 'https://cdn2.iconfinder.com/data/icons/3d-spring/512/26.Frog.png' },
        { uri: 'https://static.vecteezy.com/system/resources/previews/046/014/100/non_2x/cartoon-style-illustration-of-cute-snapper-fish-isolated-on-background-png.png' },
        { uri: 'https://www.shutterstock.com/image-vector/pink-dolphin-on-white-background-600nw-2484478563.jpg' }
    ]

    const [visible, setIsVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const outlineHard = '#424940'

    return (
        <>
            <View style={{ marginTop: insets.top, marginLeft: insets.left, marginRight: insets.right }} className="absolute top-2 left-2 z-10">
                <CustomBackButton />
            </View>
            <ScrollView style={{ paddingTop: insets.top, marginLeft: insets.left, marginRight: insets.right }}>
                <View className={`flex ${width <= lg ? 'flex-col' : 'flex-row'}`}>
                    <View className={`border-[1px] rounded-2xl overflow-hidden border-green-500 w-full h-[354px] ${width > lg && 'max-w-[512px]'}`}>
                        <LinearGradient
                            colors={['#C8E8ECA0', '#77969AA0', '#5E7C80A0', '#466367A0']}
                            locations={[0, 0.5, 0.75, 1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={StyleSheet.absoluteFill}
                        />
                        <CarouselSlider>
                            {
                                images.map((image, index) => (
                                    <Pressable
                                        key={image.uri}
                                        onPress={() => {
                                            setCurrentIndex(index);
                                            setIsVisible(true);
                                        }}
                                    >
                                        <Image className='w-full h-full'
                                            source={{ uri: image.uri }}
                                            resizeMode="contain"
                                        />
                                    </Pressable>
                                ))
                            }
                        </CarouselSlider>
                        <ImageViewing
                            images={images}
                            imageIndex={currentIndex}
                            visible={visible}
                            onRequestClose={() => setIsVisible(false)}
                        />
                    </View>
                    <View className='w-full flex gap-2 p-4'>
                        <View>
                            <H3 color='#3B6939'>Sapee</H3>
                            <H4 color={outlineHard}>Reticulada</H4>
                        </View>
                        <P color={outlineHard}>Description</P>
                    </View>
                </View>
            </ScrollView >
        </>
    )
}