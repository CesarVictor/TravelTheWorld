import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, PlayfairDisplay_400Regular, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import React from 'react';

// Maintenir l'écran de démarrage visible
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Cacher l'écran de démarrage une fois les polices chargées ou en cas d'erreur
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 200,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Bienvenue',
          }}
        />
        <Stack.Screen
          name="city/index"
          options={{
            title: 'Destinations',
          }}
        />
        <Stack.Screen
          name="city/[city]"
          options={{
            title: 'Découvrir',
          }}
        />
        <Stack.Screen
          name="notifications"
          options={{
            title: 'Notifications',
          }}
        />
        <Stack.Screen
          name="place/[id]"
          options={{
            title: 'Détail du lieu',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </>
  );
}
