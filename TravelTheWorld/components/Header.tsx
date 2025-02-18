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
    
      <View style={styles.topContainer}>
        <Text style={styles.subtitle}>LET'S GO!</Text>
        <View style={styles.line} />
      </View>

 
      <Text style={styles.title}>
        <Text style={{ color: "green", fontWeight: "normal" }}>{firstLine}</Text>
        {"\n"}
        {secondLine}
      </Text>

      {showSearchIcon && (
        <TouchableOpacity onPress={onSearchPress} style={styles.iconContainer}>

        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  topContainer: {
    alignItems: "flex-start", 
    marginBottom: 10,
  },
  subtitle: {
    color: "#D87C46", 
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  line: {
    width: "100%", 
    maxWidth: 300, 
    height: 2,
    backgroundColor: "#ccc",
    marginTop: 4,
  },
  title: {
    fontFamily: 'PlayfairDisplay_400Regular',
    fontSize: 45,
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
  },
  iconContainer: {
    padding: 8,
  },
});

export default Header;
