import { StyleSheet, Text, View } from "react-native";
import { Tabs } from "expo-router";
import { TabBar } from "../../src/presentation/global/components/navs/TabBar";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { breakpoint } from "../../src/presentation/global/constants/breakpoint";
import { home, homeFill, loaction, locationFill } from "../../src/presentation/global/constants/Icons";


export default function NavBar() {

  const { width } = useSafeAreaFrame()

  const { lg } = breakpoint

  return (
    <Tabs tabBar={(props) => <TabBar {...props} isVertical={width > lg && true} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIconPath: homeFill,
          tabBarIconPathInactive: home,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIconPath: locationFill,
          tabBarIconPathInactive: loaction,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
