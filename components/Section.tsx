import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Place } from '@/Data/data';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface SectionProps {
  title: string;
  places: Place[];
}

const Section: React.FC<SectionProps> = ({ title, places }) => {
  const router = useRouter();

  return (
    <View style={styles.sectionContainer}>
      {title && <Text style={styles.sectionTitle}>{title}</Text>}

      {places.map(place => (
        <TouchableOpacity
          key={place.id.toString()}
          style={styles.placeItem}
          activeOpacity={0.8}
          onPress={() => router.push(`/place/${place.id}`)}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: place.imageUrl }}
              style={styles.placeImage}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.3)']}
              style={styles.imageFade}
            />
            <View style={styles.ratingBadge}>
              <Feather name="star" size={12} color="white" />
              <Text style={styles.ratingText}>{place.rating}</Text>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.placeName} numberOfLines={1}>
              {place.name}
            </Text>
            <Text style={styles.placeDescription} numberOfLines={2}>
              {place.description}
            </Text>
          </View>

          <View style={styles.arrowContainer}>
            <Feather name="chevron-right" size={18} color="#888" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333'
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  placeImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  imageFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 2,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  placeDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  arrowContainer: {
    padding: 6,
  }
});

export default Section;
