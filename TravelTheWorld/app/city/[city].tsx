import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { City, DataService } from "@/Data/data";
import Button from "@/components/Button";

export default function CityDetailScreen() {
  const { city } = useLocalSearchParams(); // Récupère "city" depuis l'URL
  const router = useRouter();
  const [cityData, setCityData] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityData = async () => {
      const cities = await DataService.getAllCities();
      const foundCity = cities?.find((c) => c.name.toLowerCase() === city?.toString().toLowerCase());

      if (foundCity) {
        setCityData(foundCity);
      }
      setLoading(false);
    };

    fetchCityData();
  }, [city]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="black" />;
  }

  if (!cityData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>City not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <ImageBackground source={{ uri: cityData.imageUrl }} style={styles.container} resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.title}>{cityData.name}</Text>
        <Text style={styles.description}>{cityData.description}</Text>
        <Button title="Back to Cities" onPress={() => router.push("/city")} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 10 },
  description: { fontSize: 16, color: "white", textAlign: "center" },
  loader: { flex: 1, justifyContent: "center" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 18, color: "red", marginBottom: 10 },
});
