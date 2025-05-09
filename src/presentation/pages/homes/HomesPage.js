import React, { useState, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, useWindowDimensions } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GridCard from '../components/cards/GridCard';

export default function HomesPage() {
  const { width: screenWidth } = useWindowDimensions();
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
  ];

  const getNumColumns = () => {
    if (screenWidth < 320) return 2;
    if (screenWidth < 640) return 2;
    if (screenWidth < 768) return 3;
    if (screenWidth < 1024) return 4;
    return 5;
  };

  const numColumns = getNumColumns();

  const columnGap = 8; // Ajusta esto al margen entre columnas si usas alguno
  const paddingHorizontal = 16;
  const columnWidth = (screenWidth - paddingHorizontal * 2 - columnGap * (numColumns - 1)) / numColumns;

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
      <MasonryList
        style={{ paddingHorizontal: paddingHorizontal, paddingTop: 16, paddingBottom: 98 }} //marginBotton has 8px
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
              style={{
                marginBottom: 8,
                marginRight: i % 2 === 0 ? 4 : 0, // columna izquierda
                marginLeft: i % 2 !== 0 ? 4 : 0,  // columna derecha
              }}
              image={item.image}
              title={item.name}
              subtitle={item.scientificName}
              h={height}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
