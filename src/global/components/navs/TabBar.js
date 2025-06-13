import { TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabButton from "../buttons/TabButton";
import { menu } from "../../constants/icons";

export const TabBar = ({ state, descriptors, navigation, isVertical = false,
  gradientColors = ['#BCF0B4', '#86B880', '#53824F', '#3B6939'],
  locations,
}) => {
  const insets = useSafeAreaInsets();
  const isSingleColor = gradientColors.length === 1

  return (
    <View
      style={{
        paddingTop: 64 + insets.top,
        paddingLeft: 16 + insets.left,
        paddingRight: 16 + insets.right,
        paddingBottom: 16 + insets.bottom,
      }}
      className={`absolute bottom-0 ${isVertical ? 'max-w-[384px] w-full self-center' : 'h-full justify-center'}`}>
      <View
        style={styles.shadow}
        className={`rounded-full border border-outline overflow-hidden ${isVertical ? 'w-full' : ' w-[72px]'}`}>
        <LinearGradient
          colors={["#C8E8ECA1", "#77969AA1", "#5E7C80A1", "#466367A1"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <ScrollView
          horizontal={isVertical}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: isVertical ? 'row' : 'col',
            alignItems: 'center',
            justifyContent: 'space-evenly',   // Centra si hay pocos
            flexGrow: 1,                 // Hace que se expanda cuando hay poco contenido
            gap: 8,
            paddingHorizontal: isVertical ? 16 : 8,
            paddingVertical: isVertical ? 8 : 16,
          }}
        >
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

            const iconPath = isFocused
              ? options.tabBarIconPath
              : options.tabBarIconPathInactive ?? options.tabBarIconPath;

            return (
              <TabButton
                key={route.key}
                label={label}
                iconPath={iconPath}
                isFocused={isFocused}
                onPress={onPress}
                onLongPress={onLongPress}
                tabBarAccessibilityLabel={options.tabBarAccessibilityLabel}
                tabBarButtonTestID={options.tabBarButtonTestID}
                gradientColors={gradientColors}
                locations={locations}
                isSingleColor={isSingleColor}
              />
            );
          }
          )
          }
          <TabButton
            label="Más"
            iconPath={menu}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    elevation: 6, // Android
    shadowColor: '#000', // iOS
  },
})