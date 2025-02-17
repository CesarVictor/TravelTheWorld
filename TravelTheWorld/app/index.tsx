import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";
import {useFonts, PlayfairDisplay_400Regular} from "@expo-google-fonts/playfair-display";

export default function HomeScreen() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
  });


  return (
    <ImageBackground source={require("../assets/images/welcome-bg.png")} style={styles.container}>
    <View style={styles.overlay}>
        <Text style={styles.title}>Hello, Leonard!</Text>
        <TouchableOpacity onPress={() => router.push("/city")}>
        <Text style={styles.buttonText}>EXPLORE</Text>
        </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  overlay: { padding: 20, borderRadius: 10, width: "80%", alignItems: "center" },
  title: { fontFamily:'PlayfairDisplay_400Regular', fontSize: 32, color: "white", fontWeight: "bold", marginBottom: 20 },
  button: { backgroundColor: "#ff6200", paddingVertical: 10, paddingHorizontal: 30, borderRadius: 10 },
  buttonText: { color: "white", fontSize: 20, fontWeight: "bold" },
});
