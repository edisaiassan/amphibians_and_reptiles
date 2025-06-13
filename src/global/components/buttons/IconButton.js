import {  StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from '../Icon'
import { LinearGradient } from 'expo-linear-gradient'

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
    const isSingleColor = gradientColors.length === 1;

    return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonWrapper, shadow && styles.shadow]}>
            <LinearGradient
                colors={isSingleColor ? [gradientColors[0], gradientColors[0]] : gradientColors}
                locations={
                    isSingleColor
                        ? [0, 1]
                        : locations ?? [0, 0.25, 0.5, 1]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.gradient}
            />
            <Icon path={path} h={h} w={w} iconColor={iconColor} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonWrapper: {
        padding: 8,
        borderRadius: 999,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 999,
    },
    shadow: { elevation: 6 },
})
