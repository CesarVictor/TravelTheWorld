import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import DataService, { Place, Places } from "@/Data/data";
import Section from "./Section";
import CategoryFilter from "./categoryFilter";
import TopCard from "./TopCard";
import SectionSkeleton from "./skeleton/SectionSkeleton";
import CategoryFilterSkeleton from "./skeleton/CategoryFilterSkeleton";
import TopCardSkeleton from "./skeleton/TopCardSkeleton";

const CATEGORY_LABELS: Record<string, string> = {
  all: "Tout",
  restaurants: "Restaurants",
  museums: "Musées",
  historical_sites: "Sites historiques",
  activities: "Activités",
};

interface MainComponentProps {
  places: Places;
  loading: boolean;
}

const MainComponent: React.FC<MainComponentProps> = ({ places, loading }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [placesByCategory, setPlacesByCategory] = useState<{ [key: string]: { top: Place[]; nearby: Place[] } }>({});
  const [isLoading, setIsLoading] = useState(true);

  // Utiliser les places passées en props au lieu de les récupérer à nouveau
  useEffect(() => {
    if (!loading && places) {
      const transformed: { [key: string]: { top: Place[]; nearby: Place[] } } = {};

      Object.entries(places).forEach(([category, placesArray]) => {
        transformed[category] = {
          top: placesArray.slice(0, 3), // top 3
          nearby: placesArray.slice(3), // tous les autres
        };
      });

      setPlacesByCategory(transformed);
      setIsLoading(false);
    }
  }, [places, loading]);

  const categories = ['all', ...Object.keys(placesByCategory)];
  
  const categoryLabel = selectedCategory === "all" 
    ? "lieux" 
    : CATEGORY_LABELS[selectedCategory] || selectedCategory;
    
  const titleTop = `Top ${categoryLabel}`;
  const titleNearby = `${categoryLabel} à proximité`;

  const topPlacesToShow =
    selectedCategory === "all"
      ? Object.values(placesByCategory).flatMap((cat) => cat.top)
      : placesByCategory[selectedCategory]?.top || [];

  const nearbyPlacesToShow =
    selectedCategory === "all"
      ? Object.values(placesByCategory).flatMap((cat) => cat.nearby)
      : placesByCategory[selectedCategory]?.nearby || [];

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
      <TopCard places={topPlacesToShow} />

      <Text style={styles.sectionHeader}>{titleNearby}</Text>
    </View>
  );

  return (
    <FlatList
      data={nearbyPlacesToShow}
      keyExtractor={(item) => item.id.toString()}
      horizontal={false}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aucun lieu disponible dans cette catégorie</Text>
        </View>
      }
      ListHeaderComponent={renderContent}
      renderItem={({ item }) => (
        <View style={styles.itemWrapper}>
          <Section places={[item]} title={""} />
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
  }
});

export default MainComponent;
