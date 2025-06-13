import { ScrollView } from 'react-native'
import { refresh } from '../constants/icons'
import { Icon } from '../components/Icon'
import MainButton from '../components/buttons/MainButton'
import P from '../components/texts/P'

export default function MessageSection({
    message,
    onPress,
    labelButton,
    iconPath,
    scrollPadding
}) {
    return (
        <ScrollView contentContainerStyle={scrollPadding}>
            <P className='text-center'>{message}</P>
            <MainButton
                leftChild={<Icon path={iconPath ?? refresh} />}
                onPress={onPress}
            >
                {labelButton ?? 'Reintentar'}
            </MainButton>
        </ScrollView>
    )
}