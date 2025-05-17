import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "../Icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const TabBar = ({ state, descriptors, navigation, isVertical = false }) => {

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container} className={`absolute ${isVertical ? 'left-4 top-1/2' : 'bottom-0 w-full'}`}>
      <View
        style={[styles.bottomNavBar, { bottom: 16 + insets.bottom, maxWidth: !isVertical && 384, alignSelf: !isVertical && "center" }]}
        className={`${isVertical ? 'flex flex-col px-2 py-4' : 'w-full flex flex-row justify-around py-2 px-4'} gap-2`}
      >
        <LinearGradient
          colors={["#C8E8ECA1", "#77969AA1", "#5E7C80A1", "#466367A1"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          // ✅ Icono dinámico según estado
          const iconPath = isFocused
            ? options.tabBarIconPath
            : options.tabBarIconPathInactive ?? options.tabBarIconPath;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              //style={styles.tabButton}
              className="flex flex-col gap-2 items-center"
            >
              <View
                className={`px-4 py-1 ${isFocused && 'bg-green-500 rounded-full'}`}
              >
                <Icon
                  path={iconPath}
                  iconColor={isFocused ? "white" : "white"}
                />
              </View>
              <Text className='text-white'>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavBar: {
    borderRadius: 9999,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  container: {
    /* marginLeft: 16,
    marginRight: 16, */
  },
});
