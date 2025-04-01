import React, { useEffect, useState, useMemo } from "react";
import { View, StyleSheet, ImageBackground, Text, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { City, DataService } from "@/Data/data";
import CardCarousel from "@/components/CardCarroussel";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function CityScreen() {
  const router = useRouter();
  const [cities, setCities] = useState<City[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchCities = async () => {
      const result = await DataService.getAllCities();
      if (result) setCities(result);
    };
    fetchCities();
  }, []);

  const backgroundImage = useMemo(() => cities[activeIndex]?.imageUrl, [cities, activeIndex]);

  return (
    <ImageBackground
      style={styles.container}
      source={backgroundImage ? { uri: backgroundImage } : undefined}
      resizeMode="cover"
      blurRadius={8}
    >
      <View style={styles.overlay}>
        <View style={styles.headerBlock}>
          <Text style={styles.letsGo}>LET’S GO!</Text>
          <View style={styles.line} />
          <Text style={styles.title}>
            <Text>Choose your city</Text>
          </Text>
        </View>

        <CardCarousel
          cities={cities}
          onChangeIndex={(index) => setActiveIndex(index)}
          onSelectCity={(name) => router.push(`/city/${name}`)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  overlay: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerBlock: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  letsGo: {
    fontSize: 14,
    color: "#D96D1F",
    letterSpacing: 1,
    fontWeight: "600",
    marginBottom: 4,
    
  },
  line: {
    height: 1,
    width: 300,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "PlayfairDisplay_700Bold",
  },
  green: {
    color: "#2F7E3E",
  },
});
