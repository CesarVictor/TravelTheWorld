import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    StatusBar,
    Platform,
    Animated,
    Share
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { DataService, Place } from '@/Data/data';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = height * 0.5; 
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function PlaceDetailScreen() {
    const { id } = useLocalSearchParams();
    const placeId = typeof id === 'string' ? parseInt(id, 10) : -1;
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [place, setPlace] = useState<Place | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const scrollY = new Animated.Value(0);

    useEffect(() => {
        const fetchPlaceDetails = async () => {
            try {
                setLoading(true);
                const allPlaces = await DataService.getAllPlaces();
                const foundPlace = allPlaces.find(p => p.id === placeId);

                if (foundPlace) {
                    setPlace(foundPlace);
                } else {
                    setError(`Lieu avec l'ID ${placeId} non trouvé`);
                }
            } catch (err) {
                console.error('Erreur lors du chargement des détails du lieu:', err);
                setError('Impossible de charger les détails');
            } finally {
                setLoading(false);
            }
        };

        if (placeId > 0) {
            fetchPlaceDetails();
        } else {
            setError('ID de lieu invalide');
            setLoading(false);
        }
    }, [placeId]);

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });

    const headerTitleOpacity = scrollY.interpolate({
        inputRange: [HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const headerImageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const handleShare = async () => {
        if (!place) return;
        try {
            await Share.share({
                message: `Découvrez ${place.name} sur TravelTheWorld ! ${place.description.substring(0, 100)}...`,
                title: place.name,
            });
        } catch (error) {
            console.error('Erreur lors du partage:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#D96D1F" />
                <Text style={styles.loadingText}>Chargement des détails...</Text>
            </View>
        );
    }

    if (error || !place) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error || 'Une erreur est survenue'}</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>Retour</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Animated Header */}
            <Animated.View style={[styles.header, { height: headerHeight }]}>
                <Animated.Image
                    source={{ uri: place.imageUrl }}
                    style={[styles.headerImage, { opacity: headerImageOpacity }]}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.4)']}
                    style={styles.headerGradient}
                />

                {/* Header Title - visible when scrolling */}
                <Animated.View
                    style={[styles.headerTitleContainer, { opacity: headerTitleOpacity, paddingTop: insets.top || 40 }]}
                >
                    <Text style={styles.headerTitle} numberOfLines={1}>{place.name}</Text>
                </Animated.View>

                {/* Back Button */}
                <View style={[styles.headerControls, { paddingTop: insets.top || 40 }]}>
                    <TouchableOpacity
                        style={styles.backIcon}
                        onPress={() => router.back()}
                        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                    >
                        <Feather name="arrow-left" size={24} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.shareIcon}
                        onPress={handleShare}
                        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                    >
                        <Feather name="share" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Rating badge */}
                <Animated.View style={[styles.ratingContainer, { opacity: headerImageOpacity }]}>
                    <Feather name="star" size={18} color="#FFD700" />
                    <Text style={styles.ratingText}>{place.rating.toFixed(1)}</Text>
                </Animated.View>
            </Animated.View>

            {/* Content */}
            <Animated.ScrollView
                style={styles.contentScroll}
                contentContainerStyle={styles.scrollViewContent}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
            >
                <View style={styles.contentContainer}>
                    {/* Augmentation du padding pour éviter que le titre ne soit trop proche de l'image */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{place.name}</Text>
                        <View style={styles.categoryBadge}>
                            <Text style={styles.categoryText}>{place.category}</Text>
                        </View>
                    </View>

                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Feather name="info" size={18} color="#D96D1F" style={styles.sectionIcon} />
                            <Text style={styles.sectionTitle}>Description</Text>
                        </View>
                        <Text style={styles.description}>{place.description}</Text>
                    </View>

                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Feather name="map-pin" size={18} color="#D96D1F" style={styles.sectionIcon} />
                            <Text style={styles.sectionTitle}>Informations</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Feather name="map" size={16} color="#666" />
                            <Text style={styles.infoText}>123 Avenue de Paris, 75001 Paris</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Feather name="clock" size={16} color="#666" />
                            <Text style={styles.infoText}>Ouvert de 9h à 18h</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Feather name="phone" size={16} color="#666" />
                            <Text style={styles.infoText}>+33 1 23 45 67 89</Text>
                        </View>
                    </View>

                    <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => { }}>
                            <Feather name="bookmark" size={20} color="#fff" />
                            <Text style={styles.actionButtonText}>Sauvegarder</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.actionButton, styles.primaryButton]} onPress={() => { }}>
                            <Feather name="navigation" size={20} color="#fff" />
                            <Text style={styles.actionButtonText}>Y aller</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    errorText: {
        fontSize: 18,
        color: '#D32F2F',
        textAlign: 'center',
        marginBottom: 20,
    },
    backButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: '#D96D1F',
        borderRadius: 8,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    header: {
        position: 'absolute',
        top: -30,
        left: 0,
        right: 0,
        overflow: 'hidden',
        zIndex: 10,
    },
    headerImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
    },
    headerGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: HEADER_MAX_HEIGHT,
    },
    headerTitleContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: HEADER_MIN_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 60,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    headerControls: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_MIN_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        zIndex: 20,
    },
    backIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingContainer: {
        position: 'absolute',
        left: 16,
        bottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
    },
    ratingText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 6,
        fontSize: 16,
    },
    contentScroll: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        paddingTop: HEADER_MAX_HEIGHT,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // Déplacer le contenu vers le haut pour qu'il empiète légèrement sur l'image
        marginTop: -30,
    },
    contentContainer: {
        // Augmentation du padding pour donner plus d'espace au contenu
        padding: 24,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // Plus d'espace au-dessus du titre
        marginTop: 10,
        marginBottom: 24,
    },
    title: {
        flex: 1,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'PlayfairDisplay_700Bold',
    },
    categoryBadge: {
        backgroundColor: '#F0F8FF',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        marginLeft: 12,
    },
    categoryText: {
        color: '#2A7FFF',
        fontWeight: '600',
        fontSize: 14,
    },
    sectionContainer: {
        marginBottom: 24,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },
    sectionIcon: {
        marginRight: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoText: {
        marginLeft: 12,
        fontSize: 15,
        color: '#444',
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 30,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#555',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginHorizontal: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    primaryButton: {
        backgroundColor: '#D96D1F',
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 8,
    },
    imageContainer: {
        width: width,
        height: height * 0.4,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});