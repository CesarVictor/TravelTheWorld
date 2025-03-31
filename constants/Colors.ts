/**
 * Thème de couleurs pour l'application
 * Ces couleurs sont utilisées pour l'apparence générale de l'application en mode clair et sombre
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#68c6e5';

export const Colors = {
  light: {
    text: '#11181C',
    textSecondary: '#687076',
    background: '#fff',
    backgroundSecondary: '#f8f9fa',
    card: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: '#e6e6e6',
    notification: '#ff3b30',
    // Nouveaux thèmes de couleurs
    primary: '#0a7ea4',
    secondary: '#2C534F',
    accent: '#D87C46',
    success: '#34C759',
    warning: '#FFCC00',
    error: '#FF3B30',
    subtle: '#D1E7E0',
  },
  dark: {
    text: '#ECEDEE',
    textSecondary: '#9BA1A6',
    background: '#151718',
    backgroundSecondary: '#1e2022',
    card: '#1e2022',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    border: '#2c2e30',
    notification: '#ff453a',
    // Nouveaux thèmes de couleurs
    primary: '#68c6e5',
    secondary: '#4ECDC4',
    accent: '#FF8A65',
    success: '#30D158',
    warning: '#FFD60A',
    error: '#FF453A',
    subtle: '#264D47',
  },
};
