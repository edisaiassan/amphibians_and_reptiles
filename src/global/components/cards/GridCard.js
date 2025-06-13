import { View, Pressable, Image, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import H4 from '../texts/H4'
import P from '../texts/P'
import { Icon } from '../Icon'
import { imageIcon } from '../../constants/icons'

export default function GridCard({
    onPress,
    image,
    title,
    subtitle,
    aspectRatio,
    w = 'w-full',
    style
}) {

    return (
        <Pressable style={style}
            onPress={onPress}>
            <View>
                {image !== null && image !== '' ?
                    <Image
                        className={`z-10 ${w}`}
                        source={{ uri: image }}
                        style={[{
                            aspectRatio,
                        },
                        styles.image
                        ]}
                    /> : <View className='w-full items-center'>
                        <View className='items-center justify-center bg-white p-4 z-10' style={styles.image}>
                            <Icon
                                path={imageIcon}
                                width={40}
                                height={40}
                            />
                        </View>
                    </View>
                }
                <View
                    className='px-4 pb-4 pt-8'>
                    <LinearGradient
                        colors={['#BCF0B4', '#6C9D67', '#53824F', '#3B6939']}
                        locations={[0, 0.5, 0.75, 1]} // <-- Aquí defines los stops
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.gradient}
                    />
                    <H4 color='text-white'>{title}</H4>
                    <P color='text-white italic'>{subtitle}</P>
                </View>
            </View>
        </Pressable>
    )
}

const styles = {
    gradient: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 16
    },
    image: {
        borderRadius: 16,
        marginBottom: -28,
        elevation: 6, // Android
        shadowColor: '#000', // iOS
    }
}
