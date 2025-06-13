import { Stack } from 'expo-router'

export default function _collectionLayout() {
  return <Stack screenOptions={{
    headerShown: false,
    animation: 'slide_from_right'
  }} />
}