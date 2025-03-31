import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { City, DataService } from '@/Data/data';

interface CityContextType {
  cities: City[];
  loading: boolean;
  error: string | null;
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
}

const CityContext = createContext<CityContextType>({
  cities: [],
  loading: true,
  error: null,
  selectedCity: null,
  setSelectedCity: () => {},
});

export const CityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const result = await DataService.getAllCities();
        setCities(result || []);
        setError(null);
      } catch (error) {
        console.error('Erreur lors du chargement des villes:', error);
        setError('Impossible de charger les villes');
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  return (
    <CityContext.Provider 
      value={{ 
        cities, 
        loading, 
        error, 
        selectedCity, 
        setSelectedCity 
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export const useCityContext = () => useContext(CityContext);
