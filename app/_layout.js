import { StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function _layout() {
  return (
    <SafeAreaProvider>
      <View className='w-full h-full'>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerShown: false, // Oculta el encabezado para todas las pantallas de este Stack
          }}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});