import { View } from 'react-native'
import { Tabs } from 'expo-router'
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context'
import { breakpoints } from '../../src/global/constants/breakpoints'
import { TabBar } from '../../src/global/components/navs/TabBar'
import { home, homeFill, loaction, locationFill } from '../../src/global/constants/icons'
import Extend from '../../src/global/components/responsives/Extend'


export default function NavBar() {

  const { width } = useSafeAreaFrame()

  const { sm } = breakpoints

  return (
    <Extend>
      <Tabs tabBar={(props) => <TabBar {...props} isVertical={width <= sm && true} />}>
        {/* <Tabs.Screen
          name="index"
          // options={{
          //  href: null, // Esto lo oculta del TabBar
          //}}
        /> */}
        <Tabs.Screen
          name='collection'
          options={{
            href: '/collection',
            title: 'Inicio',
            tabBarIconPath: homeFill,
            tabBarIconPathInactive: home,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name='map'
          options={{
            title: 'Mapa',
            tabBarIconPath: locationFill,
            tabBarIconPathInactive: loaction,
          }}
        />
      </Tabs>
    </Extend>
  );
}