import { LinearGradient } from 'expo-linear-gradient'
import { View, TextInput, StyleSheet } from 'react-native'

export default function InputGlass({
    className,
    leftChild,
    rightChild,
    value,
    name,
    maxLength,
    numberOfLines,
    hintText,
    onChange,
    style
}) {
    return (
        <View
            style={[styles.shadow, style]}
            className={`flex flex-row items-center justify-center rounded-full border border-outline overflow-hidden ${className}`}>
            <LinearGradient {...gradienStyle} />
            {leftChild && <View className='h-full justify-center flex flex-row gap-2'> {leftChild} </View>}
                <TextInput
                    className='text-white px-2 flex-1'
                    editable
                    name={name}
                    numberOfLines={numberOfLines}
                    maxLength={maxLength}
                    placeholder={hintText}
                    placeholderTextColor='white'
                    onChange={onChange}
                    value={value}
                />
            {rightChild && <View className='h-full justify-center flex flex-row gap-2'> {rightChild} </View>}
        </View>
    )
}

const gradienStyle = {
    colors: ['#C8E8ECA1', '#77969AA1', '#5E7C80A1', '#466367A1'], //A1 63% opacidad
    locations: [0, 0.25, 0.5, 1], // <-- Aquí defines los stops
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    style: StyleSheet.absoluteFill
}

const styles = StyleSheet.create({
    shadow: {
        elevation: 6, // Android
        shadowColor: '#000000', // iOS
        paddingHorizontal: 4,
        paddingVertical: 4,
        height: 48
    },
})