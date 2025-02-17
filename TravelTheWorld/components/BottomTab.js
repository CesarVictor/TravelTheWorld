import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const CustomBottomTab = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabContainer}>
      {/* Navigation principale */}
      <View style={styles.topRow}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const iconNames = {
            Discover: "compass-outline",
            Dos: "book-outline",
            Dones: "checkmark-done-outline",
            Profile: "person-circle-outline",
          };
          const iconName = iconNames[route.name] || "help-circle-outline";

          return (
            <TouchableOpacity
              key={route.name}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tabButton}
            >
              <Ionicons name={iconName} size={24} color={isFocused ? "white" : "#aaa"} />
              <Text style={[styles.label, isFocused && styles.labelFocused]}>{route.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Bouton "Change City" */}
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.changeCityButton}>
          <Ionicons name="location-outline" size={20} color="white" />
          <Text style={styles.changeCityText}>Change City</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "black",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 20,
    paddingTop: 10,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 10,
  },
  tabButton: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#aaa",
  },
  labelFocused: {
    color: "white",
    fontWeight: "bold",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  changeCityButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  changeCityText: {
    color: "white",
    marginLeft: 8,
    fontSize: 14,
  },
  closeButton: {
    backgroundColor: "#222",
    borderRadius: 20,
    padding: 8,
  },
});

export default BottomTab;
