import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Button from "@/components/Button";
import { Feather } from "@expo/vector-icons";
import { City, DataService, Place } from "@/Data/data";
import MainComponent from "@/components/MainComponent";
import BottomDockMenu from "@/components/BottomDockMenu";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const categories = ["All", "Attractions", "Restaurants", "Hotels", "Museums", "Parks", "Shopping"];

export default function CityDetailScreen() {
  const { city } = useLocalSearchParams();
  const router = useRouter();
  const [cityData, setCityData] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const insets = useSafeAreaInsets();

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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.titleContainer}>
        <Text style={styles.discoverText}>Discover,</Text>
        <Text style={styles.cityTitleText}>{cityData.name}!</Text>
      </View>

      <MainComponent places={cityData?.places || []} loading={false} />
      {!menuVisible && (
        <TouchableOpacity style={styles.fab} onPress={() => setMenuVisible(true)}>
          <Feather name="menu" size={24} color="#fff" />
        </TouchableOpacity>
      )}
      {menuVisible && (
        <BottomDockMenu
          onChangeCity={() => router.push("/city")}
          onClose={() => setMenuVisible(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  },

  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#000",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    zIndex: 10,
  },
  titleContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  discoverText: {
    fontSize: 40,
    color: "black",
    fontFamily: "PlayfairDisplay_700Bold",
    paddingLeft: 10,
  },
  cityTitleText: {
    fontSize: 45,
    fontWeight: "bold",
    fontFamily: "PlayfairDisplay_700Bold",
    paddingLeft: 10,
  },
});
