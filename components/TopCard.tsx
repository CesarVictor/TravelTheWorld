import React from "react";
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Place } from "@/Data/data";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface TopCardProps {
  places: Place[];
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = Math.min(width * 0.85, 320);

const TopCard: React.FC<TopCardProps> = ({ places }) => {
  const router = useRouter();

  if (!places || places.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucun lieu à afficher</Text>
      </View>
    );
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={places}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      decelerationRate="fast"
      snapToInterval={CARD_WIDTH + 12}
      snapToAlignment="start"
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.cardWrapper}
          activeOpacity={0.9}
          onPress={() => router.push(`/place/${item.id}`)}
        >
          <ImageBackground
            source={{ uri: item.imageUrl }}
            style={styles.card}
            imageStyle={styles.image}
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={styles.gradient}
            />

            <View style={styles.badge}>
              <Text style={styles.badgeText}>Top</Text>
            </View>

            <View style={styles.ratingBadge}>
              <Feather name="star" size={14} color="white" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>

            <View style={styles.overlay}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 4,
    paddingBottom: 8,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  cardWrapper: {
    width: CARD_WIDTH,
    marginRight: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  card: {
    height: 220,
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
    borderRadius: 16,
  },
  image: {
    resizeMode: "cover",
  },
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#FFCB74",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#5C4200",
  },
  ratingBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
    marginLeft: 4,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
});

export default TopCard;
