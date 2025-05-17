import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';

const { width } = Dimensions.get('window');

export default function CarouselSlider({ children, w = 'w-full', h = 'h-full', className, initialPosition = 0 }) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = React.Children.count(children);

  return (
    <View className={`${h} ${w} ${className}`}>
      {totalPages === 0 ? (
        <View>
          <Text style={styles.emptyText}>No hay imágenes disponibles</Text>
        </View>
      ) : (
        <PagerView
          style={StyleSheet.absoluteFill}
          initialPage={initialPosition}
          onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        >
          {children}
        </PagerView>
      )}
      {totalPages > 1 && (
        <View className='absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-row items-center gap-[2px] p-2 rounded-2xl overflow-hidden'>
          <LinearGradient
            colors={['#BCF0B4', '#86B880', '#53824F', '#3B6939']}
            locations={[0, 0.5, 0.75, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          {Array.from({ length: totalPages }).map((_, index) => (
            <View
            className={`rounded-full ${currentPage === index ? 'bg-white size-3' : 'bg-[#002204] size-2'}`}
              key={index}
            />
          ))}
        </View>
      )}
    </View>
  );
}