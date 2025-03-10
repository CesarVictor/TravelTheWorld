import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { City } from "@/Data/data";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  runOnJS,
  Extrapolation,
  SharedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

type CardCarouselProps = {
  cities: City[];
  onChangeIndex?: (index: number) => void;
  onSelectCity?: (cityName: string) => void;
};

type AnimatedCardProps = {
  item: City;
//   index: number;
  onSelectCity?: (cityName: string) => void;
};

const AnimatedCard: React.FC<AnimatedCardProps> = ({ item, onSelectCity }) => {
  return (
    <TouchableOpacity onPress={() => onSelectCity?.(item.name)}>
      <Animated.View style={[styles.card]}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.6)"]}
          style={styles.overlay}
        />
        <Text style={styles.title}>{item.name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const CardCarousel: React.FC<CardCarouselProps> = ({ cities, onChangeIndex, onSelectCity }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<City>>(null);
  const scrollx = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollx.value = event.contentOffset.x;
      const currentIndex = Math.round(event.contentOffset.x / width);
      if (currentIndex !== activeIndex) {
        runOnJS(setActiveIndex)(currentIndex);
        if (onChangeIndex) {
          runOnJS(onChangeIndex)(currentIndex);
        }
      }
    },
  });

  const renderItem = ({ item, index }: { item: City; index: number }) => {
    return (
      <AnimatedCard
        item={item}
        onSelectCity={onSelectCity}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={cities}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        snapToInterval={width}
        decelerationRate="fast"
        snapToAlignment="center"
        style={styles.carrousel}
      />
      <View style={styles.pagination}>
        {cities.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  card: {
    width: width,
    overflow: "hidden",
    backgroundColor: "#fff",
    // marginHorizontal: (width - width * 0.7) / 2,
  },

  carrousel: {
    height: 300,
    backgroundColor: "#fff",
  },

  image: {
    height: 300,
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  pagination: {
    flexDirection: "row",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#000",
  },
});

export default CardCarousel;
