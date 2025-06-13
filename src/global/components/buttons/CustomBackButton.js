import IconButton from './IconButton'
import { useRouter } from 'expo-router'
import { backIos } from '../../constants/icons'

export default function CustomBackButton({
    shadow
}) {

    const router = useRouter()

    const onBack = () => {
        router.back()
    }

    return (
        <IconButton
            onPress={onBack}
            path={backIos}
            shadow={shadow}
        />
    )
}