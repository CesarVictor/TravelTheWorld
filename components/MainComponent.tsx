import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import DataService, { Place, Places } from "@/Data/data";
import Section from "./Section";
import CategoryFilter from "./categoryFilter";
import TopCard from "./TopCard";
import SectionSkeleton from "./skeleton/SectionSkeleton";
import CategoryFilterSkeleton from "./skeleton/CategoryFilterSkeleton";
import TopCardSkeleton from "./skeleton/TopCardSkeleton";
import { CATEGORY_LABELS } from "./categoryFilter";

interface MainComponentProps {
  places: Places;
  loading: boolean;
}

const MainComponent: React.FC<MainComponentProps> = ({ places, loading }) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [placesByCategory, setPlacesByCategory] = useState<{ [key: string]: { top: Place[]; nearby: Place[] } }>({});
  const [isLoading, setIsLoading] = useState(true);

  // Utiliser les places passées en props au lieu de les récupérer à nouveau
  useEffect(() => {
    if (!loading && places) {
      const transformed: { [key: string]: { top: Place[]; nearby: Place[] } } = {};

      Object.entries(places).forEach(([category, placesArray]) => {
        const sorted = [...placesArray].sort((a, b) => b.rating - a.rating);
        transformed[category] = {
          top: sorted.length > 1 ? [sorted[0]] : [],
          nearby: sorted.slice(1),
        };
      });

      setPlacesByCategory(transformed);
      setIsLoading(false);
    }
  }, [places, loading]);

  const categories = ['all', ...Object.keys(placesByCategory)];

  const categoryLabel = selectedCategory === "all"
    ? "Activities"
    : CATEGORY_LABELS[selectedCategory] || selectedCategory;

  const titleTop = `Top ${categoryLabel}`;
  const titleNearby = `Nearby ${categoryLabel.charAt(0).toUpperCase() + categoryLabel.slice(1)}`;

  const topPlacesToShow =
    selectedCategory === "all"
      ? Object.values(placesByCategory).flatMap((cat) => cat.top)
      : placesByCategory[selectedCategory]?.top || [];

  const nearbyPlacesToShow =
    selectedCategory === "all"
      ? Object.values(placesByCategory).flatMap((cat) => cat.nearby)
      : placesByCategory[selectedCategory]?.nearby || [];

  // Fonction pour naviguer vers la page de détail
  const handlePlacePress = (placeId: number) => {
    router.push(`/place/${placeId}`);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <CategoryFilterSkeleton />
        <TopCardSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />
      </View>
    );
  }

  const renderContent = () => (
    <View>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <Text style={styles.sectionHeader}>{titleTop}</Text>
      <TopCard
        places={topPlacesToShow}
      />

      <Text style={styles.sectionHeader}>{titleNearby}</Text>
    </View>
  );

  const renderEmptyContent = () => {
    // Si la catégorie sélectionnée n'a pas de lieux à proximité, 
    // montrer des suggestions d'autres catégories
    if (selectedCategory !== "all") {
      // Trouver les catégories qui ont des lieux à proximité
      const otherCategories = Object.entries(placesByCategory)
        .filter(([category, { nearby }]) =>
          category !== selectedCategory && nearby.length > 0);

      if (otherCategories.length === 0) {
        return (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun lieu disponible dans cette région</Text>
          </View>
        );
      }

      return (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.emptyText}>
            Aucun lieu disponible dans cette catégorie
          </Text>
          <Text style={styles.suggestionsTitle}>Découvrez d'autres catégories :</Text>

          {otherCategories.map(([category, { nearby }]) => (
            <View key={category} style={styles.suggestionSection}>
              <Text style={styles.suggestionHeader}>
                {CATEGORY_LABELS[category] || category}
              </Text>
              {nearby.slice(0, 2).map(place => (
                <View key={place.id} style={styles.itemWrapper}>
                  <Section
                    places={[place]}
                    title={""}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucun lieu disponible à proximité</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={nearbyPlacesToShow}
      keyExtractor={(item) => item.id.toString()}
      horizontal={false}
      ListEmptyComponent={renderEmptyContent}
      ListHeaderComponent={renderContent}
      renderItem={({ item }) => (
        <View style={styles.itemWrapper}>
          <Section
            places={[item]}
            title={""}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
    marginLeft: 16
  },
  itemWrapper: {
    paddingHorizontal: 16,
    marginBottom: 12
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center'
  },
  suggestionsContainer: {
    padding: 16,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 12,
    color: '#333'
  },
  suggestionSection: {
    marginBottom: 24,
  },
  suggestionHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 8,
    marginLeft: 8,
    color: '#555'
  }
});

export default MainComponent;
