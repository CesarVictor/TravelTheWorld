import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { DataService } from "@/Data/data";
import { City } from "@/Data/data";

const { width } = Dimensions.get("window");


const CardCarousel: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList<City>>(null);

    const [cities, setCities] = useState<City[]>([]);
    
    useEffect(() => {
    const fetchCities = async () => {
        const result = await DataService.getAllCities();
        if (result) {
        setCities(result);
        }
    };

    fetchCities();
    }, []);


    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffsetX / width);
        setActiveIndex(index);
    }

    const renderItem = ({ item }: { item: City }) => (
    <View style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.6)"]}
        style={styles.overlay}
        />
        <Text style={styles.title}>{item.name}</Text>
    </View>
    );

    return (
    <View style={styles.container}>
        <FlatList
        ref={flatListRef}
        data={cities}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
  },
  card: {
    width: width * 0.8,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    // Centrage horizontal de la carte dans la FlatList
    marginHorizontal: (width - width * 0.8) / 2,
  },
  image: {
    width: "100%",
    height: 300,
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
