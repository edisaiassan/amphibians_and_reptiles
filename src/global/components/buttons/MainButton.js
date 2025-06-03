import React from 'react'
import { View, Pressable } from 'react-native'
import H5 from '../texts/H5'

export default function MainButton({
    onPress,
    children,
    background = 'bg-primary',
    leftChild,
    rightChild,
    showShadow = false
}) {
    const cloneWithWhiteIconColor = (child) => {
        return React.isValidElement(child)
            ? React.cloneElement(child, { iconColor: 'white' })
            : child
    }

    return (
        <Pressable
            onPress={onPress}
            className={`px-4 py-2 ${background} rounded-full flex-row items-center justify-center gap-2 ${showShadow && 'shadow-lg'}`}
        >
            {leftChild && <View>{cloneWithWhiteIconColor(leftChild)}</View>}
            <H5 className='px-2 text-center text-white'>{children}</H5>
            {rightChild && <View>{cloneWithWhiteIconColor(rightChild)}</View>}
        </Pressable>
    )
}
