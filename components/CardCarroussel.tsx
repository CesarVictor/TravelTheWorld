import React, { useRef, useState } from 'react';
import { BlurView } from 'expo-blur';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { City } from '@/Data/data';

const { width } = Dimensions.get('window');
const snapWidth = width;

interface CardCarouselProps {
  cities: City[];
  onChangeIndex?: (index: number) => void;
  onSelectCity?: (cityName: string) => void;
}

interface CityCardProps {
  city: City;
  index: number;
  scrollX: Animated.SharedValue<number>;
  onPress: () => void;
  paginationDots: React.ReactNode;
}

const CityCard: React.FC<CityCardProps> = ({
  city,
  index,
  scrollX,
  onPress,
  paginationDots,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [(index - 1) * snapWidth, index * snapWidth, (index + 1) * snapWidth],
      [1.05, 1, 1.05],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }],
    };
  });

  return (
    <View style={styles.cardPageWrapper}>
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          {/* Only the image is animated */}
          <Animated.View style={[styles.imageWrapper, animatedStyle]}>
            <Animated.Image
              source={{ uri: city.imageUrl }}
              style={styles.cityImage}
            />
          </Animated.View>
          <Text style={styles.cityName}>{city.name.toUpperCase()}</Text>
          {/* Dots inside the card */}
          <View style={styles.paginationContainer}>{paginationDots}</View>
        </View>
      </View>
    </View>
  );
};

const CardCarousel: React.FC<CardCarouselProps> = ({
  cities,
  onChangeIndex,
  onSelectCity,
}) => {
  const flatListRef = useRef<FlatList<City>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useSharedValue(0);

  const handleScroll = (event: any) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
    const index = Math.round(event.nativeEvent.contentOffset.x / snapWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
      onChangeIndex?.(index);
    }
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={cities}
        renderItem={({ item, index }) => (
          <CityCard
            city={item}
            index={index}
            scrollX={scrollX}
            onPress={() => onSelectCity?.(item.name)}
            paginationDots={
              <View style={styles.dotsRow}>
                {cities.map((_, i) => (
                  <View
                    key={i}
                    style={[styles.dot, i === activeIndex && styles.activeDot]}
                  />
                ))}
              </View>
            }
          />
        )}
        keyExtractor={(item) => item.name}
        horizontal
        pagingEnabled
        snapToInterval={snapWidth}
        snapToAlignment="center"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        onScroll={(event) => (scrollX.value = event.nativeEvent.contentOffset.x)}
        scrollEventThrottle={16}
        style={{ flexGrow: 0 }}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          const selectedCity = cities[activeIndex];
          if (selectedCity) {
            onSelectCity?.(selectedCity.name);
          }
        }}
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
  cardPageWrapper: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    width: width * 0.88,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
    marginBottom: 20,
  },
  imageWrapper: {
    width: '100%',
    height: 390,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
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
  exploreBtnWrapper: {
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },

  exploreBtn: {
    paddingVertical: 25,
    paddingHorizontal: 100,
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

  paginationContainer: {
    marginTop: 10,
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
});

export default CardCarousel;
