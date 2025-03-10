import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

type CategoryFilterProps = {
    categories: string[];
    onSelectCategory: (category: string) => void;
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, onSelectCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);

    const handleCategoryPress = (category: string) => {
        setSelectedCategory(category);
        onSelectCategory(category);
    };

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
            {categories.map((category, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.button,
                        selectedCategory === category && styles.selectedButton
                    ]}
                    onPress={() => handleCategoryPress(category)}
                >
                    <Text style={[styles.text, selectedCategory === category && styles.selectedText]}>
                        {category.toUpperCase()}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", 
        alignItems: "center", 
        paddingVertical: 10,
        paddingHorizontal: 10, 
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: "transparent",
        marginHorizontal: 5,
        alignItems: "center", 
        justifyContent: "center", 
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
        color: "#2C534F", 
    },
});

export default CategoryFilter;
