import { StatusBar, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function _layout() {
  return (
    <SafeAreaProvider>
        <View className='flex-1'>
          <StatusBar style="dark"
          />
          <Stack
            screenOptions={{
              headerShown: false, // Oculta el encabezado para todas las pantallas de este Stack
              animation: 'slide_from_right'
            }}
          />
        </View>
    </SafeAreaProvider>
  );
}