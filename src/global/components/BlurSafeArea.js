import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BlurSafeArea() {
    const insets = useSafeAreaInsets();
    return (
        <LinearGradient
            {...blurSafeAreaGradient}
            style={[
                styles.wrapper,
                { height: insets.top }
            ]}
        />
    )
}

export const blurSafeAreaGradient = {
    colors: ['#FFFFFF', '#FFFFFFBF', '#FFFFFF00'],
    locations: [0, 0.9, 1],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        zIndex: 10,
    }
})