import { useState, useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { breakpoints } from '../../../global/constants/breakpoints';
import GridCard from '../../../global/components/cards/GridCard';
import Extend from '../../../global/components/responsives/Extend';
import InputGlass from '../../../global/components/inputs/InputGlass';
import { speciesViewModel } from './viewModel/speciesViewModel';
import { refresh } from '../../../global/constants/icons';
import MainButton from '../../../global/components/buttons/MainButton';
import P from '../../../global/components/texts/P'
import { Icon } from '../../../global/components/Icon';

export default function SpeciesPage() {
  const { species, loading, error, onGetSpecies } = speciesViewModel();
  const { width } = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const getNumColumns = () => {
    const { xs, sm, md, lg, xl } = breakpoints;
    if (width < xs) return 1;
    if (width < sm) return 2;
    if (width < md) return 3;
    if (width < lg) return 4;
    if (width < xl) return 5;
    return 6;
  };

  const numColumns = getNumColumns();
  const double8 = 8;
  const double4 = 4;
  const double56 = 56;

  // Estilo centralizado para márgenes
  const marginStyle = {
    marginLeft: width > breakpoints.sm ? insets.left + 89.6 : insets.left + 9.9,
    marginRight: insets.right + 10,
    marginTop: insets.top + double56,
    marginBottom: width > breakpoints.sm ? insets.bottom + double8 : insets.bottom + 95.6,
  };

  const onGoDetail = (id) => router.push(`/${id}`);

  useEffect(() => {
    onGetSpecies();
  }, []);

  return (
    <View className='w-full h-full flex flex-col'>
      <Stack.Screen
        options={{
          headerTitle: 'HomePage',
          headerLeft: () => {},
          headerRight: () => {},
          headerStyle: { backgroundColor: '#ff0000' },
          headerTintColor: 'white',
          headerShown: false,
        }}
      />

      {/* Buscador */}
      <View className='px-4 self-center z-10 absolute' style={{
        marginTop: insets.top,
        marginLeft: width > breakpoints.sm ? insets.left + 79.8 : insets.left,
        marginRight: insets.right,
      }}>
        <InputGlass className='w-full max-w-[512px] mt-1' />
      </View>

      {/* Contenido principal */}
      <Extend className='h-full flex flex-row items-center justify-center'>
        {loading ? (
          <ActivityIndicator size={double56} color='#3B6939' style={marginStyle} />
        ) : error ? (
          <View className='flex flex-col items-center gap-2' style={marginStyle}>
            <P className='text-center'>{error}</P>
            <MainButton leftChild={<Icon path={refresh} />}>Actualizar</MainButton>
          </View>
        ) : (
          <MasonryList
            onRefresh={onGetSpecies}
            style={marginStyle}
            data={species}
            keyExtractor={(item) => item.id.toString()}
            numColumns={numColumns}
            contentContainerStyle={{ gap: double8 }}
            renderItem={({ item }) => (
              <GridCard
                onPress={() => onGoDetail(item.id)}
                style={{ marginBottom: double8, marginRight: double4, marginLeft: double4 }}
                image={item.image}
                title={item.commonName}
                subtitle={item.scientificName}
                aspectRatio={item.aspectRatio}
              />
            )}
          />
        )}
      </Extend>
    </View>
  );
}
