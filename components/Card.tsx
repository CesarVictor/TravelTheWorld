import React from "react";
import { View, Text, ImageBackground, StyleSheet, ImageSourcePropType } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Place } from "@/Data/data";

type CardProps = {
    place: Place
};

const Card: React.FC<CardProps> = ({ place }) => {
    return (
        <View style={styles.cardContainer}>
            <ImageBackground source={{uri: place.imageUrl}} style={styles.cardImage} imageStyle={{ borderRadius: 15 }}>
                <View style={styles.content}>
                    <Text style={styles.title}>{place.name}</Text>
                    <View style={styles.footer}>
                        <View style={styles.rating}>
                            <FontAwesome name="star" size={14} color="#FFD700" />
                            <Text style={styles.ratingText}>{place.rating}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: 300,
        height: 180,
        borderRadius: 15,
        overflow: "hidden",
        marginHorizontal: 10,
    },
    cardImage: {
        flex: 1,
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    title: {
        fontSize: 16,
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
