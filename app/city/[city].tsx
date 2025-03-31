import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { City, DataService, Place } from "@/Data/data";
import CategoryFilter from "@/components/categoryFilter";
import Header from "@/components/Header";
import Card from "@/components/Card";
import MainComponent from "@/components/MainComponent";
import BottomDockMenu from "@/components/BottomDockMenu"; // 👈 Composant menu stylé
import Icon from "react-native-vector-icons/Feather";

export default function CityDetailScreen() {
  const { city } = useLocalSearchParams();
  const router = useRouter();
  const [cityData, setCityData] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false); // 👈 toggle du menu

  useEffect(() => {
    const fetchCityData = async () => {
      const cities = await DataService.getAllCities();
      const foundCity = cities?.find(
        (c) => c.name.toLowerCase() === city?.toString().toLowerCase()
      );

      if (foundCity) {
        setCityData(foundCity);
      }
      setLoading(false);
    };

    fetchCityData();
  }, [city]);

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} size="large" color="black" />
    );
  }

  const renderItem = ({ item }: { item: Place }) => <Card place={item} />;

  if (!cityData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>City not found</Text>
      </View>
    );
  }

  const categories = Object.keys(cityData.places);

  return (
    <View style={styles.container}>
      <Header title={`Discover, ${cityData.name}`} showSearchIcon={true} />
      <CategoryFilter
        categories={categories}
        onSelectCategory={(category) => console.log(category)}
      />
      <MainComponent places={cityData?.places || []} />

      {/* FAB pour ouvrir le menu */}
      {!menuVisible && (
        <TouchableOpacity style={styles.fab} onPress={() => setMenuVisible(true)}>
          <Icon name="menu" size={24} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Menu docké stylé */}
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
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginBottom: 10,
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
});
