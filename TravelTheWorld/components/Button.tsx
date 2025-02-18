import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

const ExploreButton: React.FC<ButtonProps> = ({ title, onPress, style }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.button, isHovered ? styles.buttonHover : {}, style]}
      onPress={onPress}
      onPressIn={() => setIsHovered(true)}
      onPressOut={() => setIsHovered(false)}
    >

      <Text style={[styles.text, isHovered ? styles.textHover : {}]}>{title}</Text>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  buttonHover: {
    backgroundColor: "white",
  },
  text: {
    color: "white",
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: "bold",
  },
  textHover: {
    color: "black",
  }
});

export default ExploreButton;
