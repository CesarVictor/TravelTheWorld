import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; 

interface CardProps {
    image: string;
    location: string;
    title: string;
    rating: number;
    closestTime: string;
}

const Card: React.FC<CardProps> = ({ image, location, title, rating, closestTime }) => {
    return (
        <ImageBackground source={{ uri: image }} style={styles.card}>
            {/* Badge de localisation */}
            <View style={styles.locationBadge}>
                <Text style={styles.locationText}>{location}</Text>
            </View>

            {/* Détails de la carte */}
            <View style={styles.content}>
                {/* Titre de l'activité */}
                <Text style={styles.title}>{title}</Text>

                {/* Note et heure */}
                <View style={styles.footer}>
                    <View style={styles.rating}>
                        <FontAwesome name="star" size={14} color="#FFD700" />
                        <Text style={styles.ratingText}>{rating}</Text>
                    </View>
                    <View style={styles.closestTime}>
                        <Text style={styles.closestTimeText}>Closest {closestTime}</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

// Styles
const styles = StyleSheet.create({
    card: {
        width: 300,
        height: 180,
        borderRadius: 15,
        overflow: "hidden",
        margin: 10,
        justifyContent: "flex-end",
    },
    locationBadge: {
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: "#FFD8A8",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    locationText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#6B4226",
    },
    content: {
        padding: 15,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 5,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    ratingText: {
        fontSize: 14,
        color: "#fff",
        marginLeft: 5,
    },
    closestTime: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    closestTimeText: {
        fontSize: 14,
        color: "#fff",
    },
});

export default Card;
