import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import FakeMainButton from '../components/buttons/FakeMainButton';
import FakeIconButton from '../components/buttons/FakeIconButton';
import { check, close, closeMini } from '../constants/icons';
import H3 from '../components/texts/H3';
import { Icon } from '../components/Icon';
import MainButton from '../components/buttons/MainButton';
import H4 from '../components/texts/H4';

export default function FilterSection({ onClose, hiddenVertical, isVertical = true, isFloating = true }) {

    const { height } = useSafeAreaFrame()
    const insets = useSafeAreaInsets()

    return (
        <View style={{
            flex: 1,
            height: isVertical && height - insets.top - insets.bottom
        }}>
            <LinearGradient
                colors={['#C8E8EC', '#77969A']}
                locations={[0, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[StyleSheet.absoluteFillObject, { borderRadius: 16, borderWidth: 1, borderColor: '#72796F' }]}
            />

            <View style={{
                flex: 1,
                padding: 16,
                gap: 8
            }}>
                <View className='flex flex-row gap-2 items-center'>
                    <H3 className='text-primary flex-1'>Filtros</H3>
                    <TouchableOpacity onPress={() => {
                        onClose?.()
                        hiddenVertical?.()
                    }}>
                        <FakeIconButton path={close} />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    style={{
                        borderRadius: 16,
                        backgroundColor: '#FFFFFFA1',
                        flex: 1
                    }}
                    contentContainerStyle={{
                        padding: 16,
                        gap: 16,
                    }}
                >
                    <View className='gap-2'>
                        <H3 className='text-primary'>Barcode</H3>
                        <View className='w-full bg-white border border-outline rounded-full flex flex-row flex-wrap items-center justify-evenly'>
                            <MainButton className="flex-grow-0">Todos</MainButton>
                            <MainButton className="flex-grow-0" gradientColors={['#00000000']} foregroundColor='#3B6939'>Barcode</MainButton>
                            <MainButton className="flex-grow-0" gradientColors={['#00000000']} foregroundColor='#3B6939'>Sin barcode</MainButton>
                        </View>
                    </View>
                    <View className='gap-2'>
                        <H3 className='text-primary'>Muestras con huevos</H3>
                        <View className='w-full bg-white border border-outline rounded-full flex flex-row flex-wrap items-center justify-evenly'>
                            <MainButton className="flex-grow-0">Todos</MainButton>
                            <MainButton className="flex-grow-0" gradientColors={['#00000000']} foregroundColor='#3B6939'>Con huevo</MainButton>
                            <MainButton className="flex-grow-0" gradientColors={['#00000000']} foregroundColor='#3B6939'>Sin huevo</MainButton>
                        </View>
                    </View>
                    <View className='gap-2'>
                        <H3 className='text-primary'>Taxonomía</H3>
                        <H4 className='text.outline'>Clase</H4>
                        <TextInput label="Name" />
                    </View>
                    <View className='gap-2'>
                        <H3 className='text-primary'>Localidad</H3>
                        <View className='w-full bg-orange-500 h-10'></View>
                    </View>
                    <View className='gap-2'>
                        <H3 className='text-primary'>Localidad</H3>
                        <View className='w-full bg-orange-500 h-10'></View>
                    </View>
                    <View className='gap-2'>
                        <H3 className='text-primary'>Fecha</H3>
                        <View className='w-full bg-orange-500 h-10'></View>
                    </View>
                </ScrollView>
                <View className='flex flex-row' style={{ gap: 8 }}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                        onClose?.()
                    }}>
                        <FakeMainButton
                            leftChild={<Icon path={closeMini} />}
                            gradientColors={['#FFDAD6', '#FF5449', '#DE3730', '#BA1A1A']}
                            locations={[0, 0.25, 0.5, 1]}
                        >
                            Limpiar</FakeMainButton>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                        onClose?.()
                    }}>
                        <FakeMainButton
                            leftChild={<Icon path={check} />}
                        >Aplicar</FakeMainButton>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}