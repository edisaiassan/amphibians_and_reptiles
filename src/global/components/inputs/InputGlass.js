import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { filter, search } from '../../constants/icons'
import IconButton from '../buttons/IconButton'

export default function InputGlass({
className
}) {

    const [value, onChangeText] = useState('Useless Multiline Placeholder');

    return (
        <View
            style={{
                paddingHorizontal: 4,
                paddingVertical: 4,
                height: 48
            }}
            className={`flex flex-row items-center justify-center rounded-full overflow-hidden min-w-full ${className}`}>
            <LinearGradient
                colors={['#C8E8ECA1', '#77969AA1', '#5E7C80A1', '#466367A1']} //A1 63% opacidad
                locations={[0, 0.25, 0.5, 1]} // <-- Aquí defines los stops
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StyleSheet.absoluteFill}
            />
            <View className='h-full justify-center'>
                <IconButton
                    path={search}
                    iconColor='white'
                    gradientColors={['#FF000000']}
                />
            </View>
            <View className='flex-1'>
                <TextInput
                    className='text-white px-2'
                    editable
                    numberOfLines={4}
                    maxLength={40}
                    onChange={text => onChangeText(text)}
                    value={value}
                />
            </View>
            <View className='h-full justify-center'>
                <IconButton
                    path={filter}
                />
            </View>
        </View>
    )
}