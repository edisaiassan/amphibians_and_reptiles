import { StyleSheet, Text, View } from "react-native";
import { Tabs } from "expo-router";
import { TabBar } from "../../src/presentation/pages/components/navs/TabBar";
import { home, homeFill, loaction, locationFill } from "../../src/presentation/pages/constants/Icons";

export default function NavBar() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
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
          tabBarIconPathInactive: loaction ,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
