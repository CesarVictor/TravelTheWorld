import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type HeaderProps = {
  title: string;
  showSearchIcon?: boolean;
  onSearchPress?: () => void;
};

const Header: React.FC<HeaderProps> = ({ title, showSearchIcon = false, onSearchPress }) => {
  const words = title.split(" ");
  const firstLine = words[0];
  const secondLine = words.slice(1).join(" ");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={{ fontWeight: "normal" }}>{firstLine}</Text>
        {"\n"}
        {secondLine}
      </Text>
      {showSearchIcon && (
        <TouchableOpacity onPress={onSearchPress} style={styles.iconContainer}>
          {/* Ici tu peux ajouter ton icône */}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'PlayfairDisplay_400Regular',
    fontSize: 32,
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
  },
  iconContainer: {
    padding: 8,
  },
});

export default Header;
