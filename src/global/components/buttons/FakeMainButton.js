import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import H5 from '../texts/H5'
import { LinearGradient } from 'expo-linear-gradient'

export default function FakeMainButton({
    children,
    leftChild,
    rightChild,
    showShadow = false,
    gradientColors = ['#BCF0B4', '#86B880', '#53824F', '#3B6939'],
    locations,
    className,
    style
}) {
    const cloneWithWhiteIconColor = (child) => {
        return React.isValidElement(child)
            ? React.cloneElement(child, { iconColor: 'white' })
            : child;
    };

    const isSingleColor = gradientColors.length === 1;

    return (
        <View
            className={`p-2 flex-row items-center justify-center gap-2 overflow-hidden ${className}`}
            style={[styles.buttonWrapper, showShadow && styles.shadow, { flexShrink: 1 }, style]}
        >
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
            {leftChild && (
                <View className="items-center justify-center">
                    {cloneWithWhiteIconColor(leftChild)}
                </View>
            )}
            <View style={{ flexShrink: 1 }}>
                <H5
                    className="text-white text-center px-2"
                    style={{ flexShrink: 1 }}
                    numberOfLines={0}
                >
                    {children}
                </H5>
            </View>
            {rightChild && (
                <View className="items-center justify-center">
                    {cloneWithWhiteIconColor(rightChild)}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    buttonWrapper: {
        borderRadius: 999,
        overflow: 'visible', // permite que se vea la sombra
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 999,
    },
    shadow: {
        // Android
        elevation: 6,

        // iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
});