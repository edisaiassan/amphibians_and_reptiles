import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import { breakpoints } from "../../src/global/constants/breakpoints";
import { TabBar } from "../../src/global/components/navs/TabBar";
import { home, homeFill, loaction, locationFill } from "../../src/global/constants/icons";


export default function NavBar() {

  const { width } = useSafeAreaFrame()
  const insets = useSafeAreaInsets()

  const { sm } = breakpoints

  return (
    <Tabs tabBar={(props) => <TabBar {...props} isVertical={width > sm && true} />}>
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