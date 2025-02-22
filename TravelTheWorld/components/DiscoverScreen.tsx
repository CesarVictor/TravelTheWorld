import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DiscoverScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Découvre les meilleures activités !</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, fontWeight: "bold" },
});

export default DiscoverScreen;
