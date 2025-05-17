import React, { useState, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, useWindowDimensions } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { View } from 'react-native';
import GridCard from '../../global/components/cards/GridCard';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import Extend from '../../global/components/responsives/Extend';
import { breakpoint } from '../../global/constants/breakpoint';

export default function SpeciesPage() {

  const { width } = useSafeAreaFrame()

  const { xs, sm, md, lg, xl, xxl } = breakpoint

  const insets = useSafeAreaInsets();
  const router = useRouter()

  const onGoDetail = (id) => {
    router.push(`/${id}`)
  }

  const [imageSizes, setImageSizes] = useState({});

  const species = [
    {
      id: 1,
      name: 'Specie1',
      scientificName: 'Scientific Name1',
      image: 'https://cdn2.iconfinder.com/data/icons/3d-spring/512/26.Frog.png'
    },
    {
      id: 2,
      name: 'Specie2',
      scientificName: 'Scientific Name2',
      image: 'https://static.vecteezy.com/system/resources/previews/046/014/100/non_2x/cartoon-style-illustration-of-cute-snapper-fish-isolated-on-background-png.png'
    },
    {
      id: 3,
      name: 'Specie3',
      scientificName: 'Scientific Name3',
      image: 'https://static.vecteezy.com/system/resources/previews/046/014/100/non_2x/cartoon-style-illustration-of-cute-snapper-fish-isolated-on-background-png.png'
    },
    {
      id: 4,
      name: 'Specie4',
      scientificName: 'Scientific Name4',
      image: 'https://www.shutterstock.com/image-vector/pink-dolphin-on-white-background-600nw-2484478563.jpg'
    },
    {
      id: 5,
      name: 'Specie5',
      scientificName: 'Scientific Name5',
      image: 'https://images.vexels.com/media/users/3/318410/isolated/preview/eba4aa0cd5cf829edb21df16da01a6a4-lindo-carpincho-jugando-con-una-mariposa.png'
    },
    {
      id: 6,
      name: 'Specie6',
      scientificName: 'Scientific Name6',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAbfOnPvDK0zLJP1NRZmqFz41vOA9n1fZq_g&s'
    },
    {
      id: 7,
      name: 'Specie4',
      scientificName: 'Scientific Name4',
      image: 'https://www.shutterstock.com/image-vector/pink-dolphin-on-white-background-600nw-2484478563.jpg'
    },
    {
      id: 8,
      name: 'Specie1',
      scientificName: 'Scientific Name1',
      image: 'https://cdn2.iconfinder.com/data/icons/3d-spring/512/26.Frog.png'
    },
    {
      id: 9,
      name: 'Specie2',
      scientificName: 'Scientific Name2',
      image: 'https://static.vecteezy.com/system/resources/previews/046/014/100/non_2x/cartoon-style-illustration-of-cute-snapper-fish-isolated-on-background-png.png'
    },
    {
      id: 10,
      name: 'Specie3',
      scientificName: 'Scientific Name3',
      image: 'https://static.vecteezy.com/system/resources/previews/046/014/100/non_2x/cartoon-style-illustration-of-cute-snapper-fish-isolated-on-background-png.png'
    },
    {
      id: 11,
      name: 'Specie4',
      scientificName: 'Scientific Name4',
      image: 'https://www.shutterstock.com/image-vector/pink-dolphin-on-white-background-600nw-2484478563.jpg'
    },
    {
      id: 12,
      name: 'Specie5',
      scientificName: 'Scientific Name5',
      image: 'https://images.vexels.com/media/users/3/318410/isolated/preview/eba4aa0cd5cf829edb21df16da01a6a4-lindo-carpincho-jugando-con-una-mariposa.png'
    },
    {
      id: 13,
      name: 'Specie6',
      scientificName: 'Scientific Name6',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAbfOnPvDK0zLJP1NRZmqFz41vOA9n1fZq_g&s'
    },
    {
      id: 14,
      name: 'Specie4',
      scientificName: 'Scientific Name4',
      image: 'https://www.shutterstock.com/image-vector/pink-dolphin-on-white-background-600nw-2484478563.jpg'
    },
  ];

  const getNumColumns = () => {
    if (width < xs) return 1
    if (width < sm) return 2
    if (width < md) return 3
    if (width < lg) return 4
    if (width < xl) return 5
    return 6
  }



  const numColumns = getNumColumns();

  const columnGap = 8; // Ajusta esto al margen entre columnas si usas alguno
  const paddingHorizontal = 16;
  const columnWidth = (width - paddingHorizontal * 2 - columnGap * (numColumns - 1)) / numColumns;

  useEffect(() => {
    species.forEach((item) => {
      Image.getSize(item.image, (width, height) => {
        setImageSizes((prevSizes) => ({
          ...prevSizes,
          [item.id]: { width, height },
        }));
      });
    });
  }, []);

  return (
    <View className='w-full h-full'>
      <Stack.Screen
        options={{
          headerTitle: 'HomePage',
          headerLeft: () => {
            console.log('xd 💖')
          },
          headerRight: () => { },
          headerStyle: { backgroundColor: '#ff0000' },
          headerTintColor: 'white',
          headerShown: false,
        }}
      />
      <View
        style={{
          marginTop: insets.top + 16
        }}
        className='bg-red-500/50 h-16 w-full absolute left-0 right-0 z-10'>
        <Text>{width}</Text>
      </View>
      <Extend className='h-full flex flex-row'>
        {width > lg && <View className='w-[80px]' />}
        <MasonryList
          style={[styles.masonry, { marginTop: insets.top + 64 }]} //marginBotton has 8px
          data={species}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={{ gap: columnGap }}
          renderItem={({ item, i }) => {
            const imageSize = imageSizes[item.id];
            const height = imageSize
              ? (imageSize.height / imageSize.width) * columnWidth
              : (i % 2 === 0 ? 320 : 256); // fallback
            return (
              <GridCard
                onPress={() => onGoDetail(item.id)}
                style={{
                  marginBottom: 8,
                  marginRight: 4, // columna izquierda
                  marginLeft: 4,  // columna derecha
                }}
                image={item.image}
                title={item.name}
                subtitle={item.scientificName}
                h={height}
              />
            );
          }}
        />
      </Extend>
    </View>
  );
}

const styles = StyleSheet.create({
  masonry: {
    paddingHorizontal: 12, paddingTop: 16, paddingBottom: 148
  },
  searchBar: {}
});