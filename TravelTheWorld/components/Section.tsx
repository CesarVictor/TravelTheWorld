import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Card from '../components/ui/Card';
import { Places, Place } from "@/Data/data";

interface SectionProps {
    places: Places;
    category: keyof Places;
}

const Section: React.FC<SectionProps> = ({ places, category }) => {
    const placesList: Place[] = places[category];

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {placesList.map((place, index) => (
                    <Card
                        key={place.id}
                        image={{ uri: place.imageUrl }}
                        location={category} 
                        title={place.name}
                        rating={place.rating.toString()}
                        closestTime="7:35pm" 
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    scrollContent: {
        paddingHorizontal: 10,
    },
});

export default Section;