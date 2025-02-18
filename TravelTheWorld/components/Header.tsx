import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Icône de recherche

type HeaderProps = {
    title: string;
    showSearchIcon?: boolean;
    onSearchPress?: () => void;
};

const Header: React.FC<HeaderProps> = ({ title, showSearchIcon = false, onSearchPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {showSearchIcon && (
                <TouchableOpacity onPress={onSearchPress} style={styles.iconContainer}>
                    <FontAwesome name="search" size={20} color="#333" />
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
        paddingTop: 50, 
        paddingBottom: 10
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    iconContainer: {
        padding: 8,
    },
});

export default Header;
