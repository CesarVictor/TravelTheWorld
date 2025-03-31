import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator, ScrollView, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { City, DataService, Places } from "@/Data/data";
import Button from "@/components/Button";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MainComponent from "@/components/MainComponent";

export default function CityDetailScreen() {
  const { city } = useLocalSearchParams();
  const router = useRouter();
  const [cityData, setCityData] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const cities = await DataService.getAllCities();
        const foundCity = cities?.find(
          (c) => c.name.toLowerCase() === String(city).toLowerCase()
        );

        if (foundCity) {
          setCityData(foundCity);
        }
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement de la ville:", error);
        setLoading(false);
      }
    };

    fetchCityData();
  }, [city]);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0a7ea4" />
        <Text style={styles.loadingText}>Chargement de {city}...</Text>
      </View>
    );
  }

  if (!cityData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Ville non trouvée</Text>
        <Button title="Retour" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header avec image */}
      <View style={styles.header}>
        <ImageBackground 
          source={{ uri: cityData.imageUrl }} 
          style={styles.headerImage}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'transparent']}
            style={styles.headerGradient}
          >
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            
            <Text style={styles.cityName}>{cityData.name}</Text>
          </LinearGradient>
        </ImageBackground>
      </View>
      
      {/* Description brève */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{cityData.description}</Text>
      </View>
      
      {/* Contenu principal */}
      <View style={styles.mainContent}>
        <MainComponent places={cityData.places} loading={false} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "white" 
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  errorText: { 
    fontSize: 18, 
    color: "red", 
    marginBottom: 20 
  },
  header: {
    height: 220,
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  headerGradient: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    marginTop: 8,
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    fontFamily: "PlayfairDisplay_700Bold",
  },
  descriptionContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    fontFamily: "Inter_400Regular",
  },
  mainContent: {
    flex: 1,
  }
});
