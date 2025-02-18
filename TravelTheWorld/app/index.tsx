import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Button from "../components/Button";
import {useFonts, PlayfairDisplay_400Regular} from "@expo-google-fonts/playfair-display";
import Header from "@/components/Header";
import React from "react";
import CardCarousel from "@/components/CardCarroussel";

export default function HomeScreen() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
  });

  return (
    <ImageBackground source={require("../assets/images/welcome-bg.png")} style={styles.container}>
    <View style={styles.overlay}>
        <Header title="Hello, Leonard!" />
        <CardCarousel />
        <Button title="Explore" onPress={() => router.navigate("/city")} />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center",  },
  overlay: { padding: 20, borderRadius: 10, width: "80%", height: "80%", flexDirection: "column", justifyContent: "space-between" },
});
