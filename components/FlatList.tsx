import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import data from "@/Data/PaysVilleDescription.json"; // Import des données
import { City } from "@/Data/data";
import { DataService } from "@/Data/data";
// import function of class DataService



const { width } = Dimensions.get("window");

const FlatListCities = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  // Extraire les cities depuis le fichier `data.js`
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your city</Text>
      <FlatList
        data={cities}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedCity(item)}>
            <View style={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.cityName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    alignItems: "center",
    marginHorizontal: width * 0.1,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 250,
  },
  cityName: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
  },
  activitiesContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  activityCard: {
    width: 150,
    marginHorizontal: 10,
    alignItems: "center",
  },
  activityImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  activityName: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  }
});

export default FlatListCities;
