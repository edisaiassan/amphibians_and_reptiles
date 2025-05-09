import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "../Icon";

export const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={styles.bottomNavBar}
        className="w-full"
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
              style={styles.tabButton}
              className="flex flex-col gap-2"
            >
              <View
                className={`${
                  isFocused ? "bg-green-500" : "bg-transparent"
                } px-5 py-1 rounded-full`}
              >
                <Icon
                  path={iconPath}
                  iconColor={isFocused ? "white" : "white"}
                />
              </View>
              <Text style={{ color: isFocused ? "#ffffff" : "#ff0000" }}>
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
    flexDirection: "row",
    borderRadius: 9999,
    overflow: "hidden",
    position: "absolute",
    bottom: 16,
    alignSelf: "center", // Centra el componente en su contenedor padre
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
    maxWidth: 384,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  container: {
    marginLeft: 16,
    marginRight: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
