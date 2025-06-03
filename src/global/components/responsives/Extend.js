import { View } from 'react-native'

export default function Extend({
    children,
    min = false,
    className,
    style,
}) {
    return (
        <View className={`mx-auto w-full ${min ? 'max-w-[768px]' : 'max-w-[1280px]'} ${className}`} style={style}>
            {children}
        </View>
    )
}