import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import "../global.css";

export default function _layout() {
  return (
    <View className='w-full h-full'>
      <StatusBar style="auto" />
      <Stack />
    </View>
  );
}

const styles = StyleSheet.create({});
