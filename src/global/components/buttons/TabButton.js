import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import H5 from '../texts/H5';
import { Icon } from '../Icon';

export default function TabButton({
    label,
    iconPath,
    isFocused,
    onPress,
    onLongPress,
    tabBarAccessibilityLabel,
    tabBarButtonTestID,
    gradientColors,
    locations,
    isSingleColor, // Nueva prop para manejar un solo color en el gradiente
}) {
    return (
        <TouchableOpacity
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={tabBarAccessibilityLabel}
            testID={tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex flex-col gap-2 items-center"
        >
            <View
                className='px-4 py-1 rounded-full overflow-hidden' // Mantén overflow: hidden aquí para el gradiente interno
            >
                {isFocused && (
                    <LinearGradient
                        // Usa las props de gradiente pasadas al TabButton
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
                )}
                <Icon
                    path={iconPath}
                    iconColor={isFocused ? "white" : "white"} // Puedes hacer este color dinámico si quieres
                />
            </View>
            <H5 className='text-white text-center'>
                {label}
            </H5>
        </TouchableOpacity>
    )
}