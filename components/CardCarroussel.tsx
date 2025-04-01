import React, { useRef, useState } from 'react';
import { BlurView } from 'expo-blur';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { City } from '@/Data/data';

const { width } = Dimensions.get('window');

interface CardCarouselProps {
  cities: City[];
  onChangeIndex?: (index: number) => void;
  onSelectCity?: (cityName: string) => void;
}

const CardCarousel: React.FC<CardCarouselProps> = ({
  cities,
  onChangeIndex,
  onSelectCity,
}) => {
  const flatListRef = useRef<FlatList<City>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
    onChangeIndex?.(index);
  };

  const renderImage = ({ item }: { item: City }) => (
    <View style={styles.imageWrapper}>
      <Image source={{ uri: item.imageUrl }} style={styles.cityImage} />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      {/* Card principale */}
      <View style={styles.card}>
        <View style={styles.flatListWrapper}>
          <FlatList
            ref={flatListRef}
            data={cities}
            renderItem={renderImage}
            keyExtractor={(item) => item.name}
            horizontal
            pagingEnabled
            onMomentumScrollEnd={handleScrollEnd}
            showsHorizontalScrollIndicator={false}
            snapToInterval={width}
            snapToAlignment="center"
            decelerationRate="fast"
          />
        </View>

        <Text style={styles.cityName}>
          {cities[activeIndex]?.name.toUpperCase()}
        </Text>

        <View style={styles.paginationContainer}>
          <View style={styles.dotsRow}>
            {cities.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === activeIndex && styles.activeDot]}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Bouton en dessous */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onSelectCity?.(cities[activeIndex]?.name)}
        style={styles.exploreBtnWrapper}
      >
        <BlurView intensity={50} tint="light" style={styles.exploreBtn}>
          <Text style={styles.exploreBtnText}>EXPLORE THE CITY</Text>
        </BlurView>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 0,
    marginTop: 0,
    backgroundColor: 'transparent',
  },
  card: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    alignSelf: 'center',
  },
  flatListWrapper: {
    width: width * 0.86,
    height: 390,
    overflow: 'hidden',
    borderRadius: 8,
    marginBottom: 15,
  },
  imageWrapper: {
    width: width,
    height: 390,
  },
  cityImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  paginationContainer: {
    marginBottom: 5,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#bbb',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  exploreBtnWrapper: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  exploreBtn: {
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreBtnText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
    letterSpacing: 1,
  },
});

export default CardCarousel;
