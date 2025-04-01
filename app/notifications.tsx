import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { Feather } from '@expo/vector-icons';

// Configuration des notifications
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function NotificationScreen() {
    const router = useRouter();
    const [title, setTitle] = useState('Nouvelle notification');
    const [message, setMessage] = useState('Voici votre notification personnalisée!');

    // Fonction pour demander l'autorisation et envoyer une notification
    const sendNotification = async () => {
        try {
            // Demander l'autorisation pour les notifications
            const { status } = await Notifications.requestPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permission requise', 'Les notifications sont désactivées pour cette application.');
                return;
            }

            // Envoyer une notification
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: title || 'Nouvelle notification',
                    body: message || 'Contenu de la notification',
                    data: { screen: 'notifications' },
                },
                trigger: null, // Envoi immédiat
            });

            Alert.alert('Succès', 'Notification envoyée!');
        } catch (error) {
            console.error("Erreur lors de l'envoi de la notification:", error);
            Alert.alert('Erreur', "Impossible d'envoyer la notification");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.label}>Titre de la notification:</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Entrez un titre"
                />

                <Text style={styles.label}>Message:</Text>
                <TextInput
                    style={[styles.input, styles.messageInput]}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Entrez un message"
                    multiline
                />

                <TouchableOpacity
                    style={styles.notificationButton}
                    onPress={sendNotification}
                    activeOpacity={0.7}
                >
                    <Feather name="bell" size={24} color="#FFFFFF" />
                    <Text style={styles.notificationButtonText}>Envoyer une notification</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    messageInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    notificationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D96D1F',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 40,
    },
    notificationButtonText: {
        color: '#FFFFFF',
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 16,
    },
});