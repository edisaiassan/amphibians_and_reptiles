import { StyleSheet, Text, View } from 'react-native'
import { useRouter, useLocalSearchParams, usePathname } from 'expo-router'

export default function MapsPage() {

  const pathname = usePathname()

  return (
    <View>
      <Text>MapsPage</Text>
      <Text className='bg-primary text-white p-4'>{pathname}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})