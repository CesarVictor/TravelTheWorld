import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import Button from "@/components/Button";
import CardCarousel from "@/components/CardCarroussel";
import { City, DataService } from "@/Data/data";

export default function CityScreen() {
  const router = useRouter();

  const [cities, setCities] = useState<City[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchCities = async () => {
      const result = await DataService.getAllCities();
      if (result) {
        setCities(result);
      }
    };

    fetchCities();
  }, []);

  // Choisit l'image de fond en fonction de l'indice actif
  const backgroundImage = cities[activeIndex]?.imageUrl

  return (
    <ImageBackground
      style={styles.container}
      source={{ uri: backgroundImage }}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Header title="Choose your city" />
        <CardCarousel cities={cities} onChangeIndex={setActiveIndex} />
        <Button title="Explore" onPress={() => router.push(`/city/${cities[activeIndex]?.name}`)} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center",  },
  overlay: { padding: 20, borderRadius: 10, width: "80%", height: "80%", flexDirection: "column", justifyContent: "space-between" },
  button : { width: "100%", height: 50, backgroundColor: "black", justifyContent: "center", alignItems: "center", borderRadius: 10, opacity: 0.8 },
});
