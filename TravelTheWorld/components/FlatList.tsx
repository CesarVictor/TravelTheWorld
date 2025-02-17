import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import data from "@/Data/PaysVilleDescription.json"; // Import des données

const { width } = Dimensions.get("window");

const FlatListCities = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  // Extraire les cities depuis le fichier `data.js`
  const cities = data.countries.flatMap(country => country.cities);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your city</Text>

      {/* Liste des cities */}
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

      {/* Affichage des activités si une ville est sélectionnée */}
      {selectedCity && (
        <View style={styles.activitiesContainer}>
          <Text style={styles.subtitle}>Activities in {selectedCity.name}</Text>
          <FlatList
            data={selectedCity.places.activities}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.activityCard}>
                <Image source={{ uri: item.imageUrl }} style={styles.activityImage} />
                <Text style={styles.activityName}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      )}
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
