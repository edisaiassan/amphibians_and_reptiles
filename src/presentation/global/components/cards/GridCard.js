import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function GridCard({
    onPress,
    image,
    title,
    subtitle,
    h,
    w = 'w-full',
    style
}) {

    return (
        <Pressable style={style}
            onPress={onPress}>
            <View>
                <Image
                    className={`z-10 ${w} rounded-2xl`}
                    source={{ uri: image }}
                    style={{
                        height: h,
                        marginBottom: -28,
                        shadowColor: '#000000',
                    }}
                />
                <View className='px-4 pb-4 pt-8 rounded-2xl overflow-hidden'>
                    <LinearGradient
                        colors={['#BCF0B4', '#6C9D67', '#53824F', '#3B6939']}
                        locations={[0, 0.5, 0.75, 1]} // <-- Aquí defines los stops
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={StyleSheet.absoluteFill}
                    />
                    <Text className='text-white text-base'>{title}</Text>
                    <Text className='text-white text-sm italic'>{subtitle}</Text>
                </View>
            </View>
        </Pressable>
    )
}
