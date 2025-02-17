import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Liste des activités à faire</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, fontWeight: "bold" },
});

export default DosScreen;
