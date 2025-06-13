import { StyleSheet, View } from 'react-native'
import H5 from './texts/H5'
import H4 from './texts/H4'
import { breakpoints } from '../constants/breakpoints'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'

export default function Table({
    title,
    datas,
    gradientColors = ['#BCF0B4', '#86B880', '#53824F', '#3B6939'],
    locations,
}) {

    const { width } = useSafeAreaFrame();
    const { xs } = breakpoints
    const isSingleColor = gradientColors.length === 1

    return (
        <View style={styles.mainBorder} className='border border-primary overflow-hidden'>
            <View className='bg-pink-500 px-4 py-2'>
                <LinearGradient
                    colors={isSingleColor ? [gradientColors[0], gradientColors[0]] : gradientColors}
                    locations={
                        isSingleColor
                            ? [0, 1]
                            : locations ?? [0, 0.25, 0.5, 1]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />
                <H4 className='text-white'>{title}</H4>
            </View>
            <View>
                {
                    datas.map((data, index) => (
                        <View key={index} className={`flex flex-row ${index + 1 < datas.length && 'border-b-2 border-primary'}`}>
                            <View className={`${width >= xs && 'max-w-[160px]'} flex-1 pl-4 py-4 pr-2 border-r-2 border-primary`}>
                                <H5 className='text-primary'>{data.title}</H5>
                            </View>
                            <View className='flex-1 pr-4 py-4 pl-2 '>
                                <H5 className='text-outline'>{data.description}</H5>
                            </View>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

const styles = {
    mainBorder: {
        borderRadius: 16
    }
}