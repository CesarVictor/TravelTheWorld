import React from "react";
import { FlatList, Text, TouchableOpacity, StyleSheet, View, Animated } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

const CATEGORY_LABELS: Record<string, string> = {
  all: "Tout",
  restaurants: "Restaurants",
  museums: "Musées",
  historical_sites: "Sites historiques",
  activities: "Activités",
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  const tintColor = useThemeColor({}, 'tint');
  
  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => {
        const isSelected = item === selectedCategory;
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.button,
              isSelected && [styles.selectedButton, { backgroundColor: `${tintColor}20` }]
            ]}
            onPress={() => onSelectCategory(item)}
          >
            <Text 
              style={[
                styles.text, 
                isSelected && [styles.selectedText, { color: tintColor }]
              ]}
            >
              {(CATEGORY_LABELS[item] ?? item)}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
    marginRight: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selectedButton: {
    backgroundColor: "#D1E7E0",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  selectedText: {
    fontWeight: "600",
    color: "#2C534F",
  },
});

export default CategoryFilter;
