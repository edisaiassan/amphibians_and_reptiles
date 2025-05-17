import IconButton from './IconButton'
import { useRouter } from 'expo-router'
import { backIos } from '../../constants/Icons'

export default function CustomBackButton() {

    const router = useRouter()

    const onBack = () => router.back()

    return (
        <IconButton
            onPress={onBack}
            path={backIos}
        />
    )
}