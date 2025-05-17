import { Pressable, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Icon } from '../Icon'

export default function IconButton({
    onPress,
    path,
    h,
    w,
    iconColor = 'white',
    shadow = false,
    gradientColors = ['#BCF0B4', '#86B880', '#53824F', '#3B6939'],
    locations,
}) {
    const isSingleColor = gradientColors.length === 1

    return (
        <Pressable
            className={`p-2 rounded-full overflow-hidden ${shadow ? 'shadow-lg' : ''}`}
            onPress={onPress}
        >
            <LinearGradient
                colors={isSingleColor ? [gradientColors[0], gradientColors[0]] : gradientColors}
                locations={
                    isSingleColor
                        ? [0, 1]
                        : locations ?? [0, 0.25, 0.5, 1] // default stops if not provided
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StyleSheet.absoluteFill}
            />
            <Icon path={path} h={h} w={w} iconColor={iconColor} />
        </Pressable>
    )
}
