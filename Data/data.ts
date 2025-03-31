import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import jsonData from './PaysVilleDescription.json';

export interface Country {
    id: number;
    name: string;
    cities: City[];
}

export interface City {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    places: Places;
}

export interface Places {
    restaurants: Place[];
    museums: Place[];
    historical_sites: Place[];
    activities: Place[];
}

export interface Place {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    rating: number;
}

// Cache pour éviter de recharger les données à chaque appel
let dataCache: any = null;

export class DataService {
    static dataPath: string = "PaysVilleDescription.json";

    static setDataPath(dataPath: string): void {
        this.dataPath = dataPath;
        // Réinitialiser le cache quand on change de source
        dataCache = null;
    }
    
    static async getData(): Promise<any> {
        try {
            // Si les données sont déjà en cache, les retourner directement
            if (dataCache) {
                return dataCache;
            }
            
            dataCache = jsonData;
            return dataCache;
        }
        catch (error) {
            console.error("Erreur lors du chargement des données:", error);
            throw new DataServiceError(`Impossible de charger les données: ${error}`);
        }
    }

    static async getAllCountries(): Promise<Country[]> {
        const data = await this.getData();
        if (!data || !data.countries) {
            throw new DataServiceError("Aucun pays trouvé dans les données");
        }
        return data.countries;
    }

    static async getCountryById(countryId: number): Promise<Country | null> {
        try {
            const countries = await this.getAllCountries();
            return countries.find(country => country.id === countryId) || null;
        } catch (error) {
            console.error(`Erreur lors de la récupération du pays #${countryId}:`, error);
            return null;
        }
    }

    static async getCityById(countryId: number, cityId: number): Promise<City | null> {
        try {
            const country = await this.getCountryById(countryId);
            return country ? country.cities.find(city => city.id === cityId) || null : null;
        } catch (error) {
            console.error(`Erreur lors de la récupération de la ville #${cityId}:`, error);
            return null;
        }
    }

    static async getAllCities(): Promise<City[]> {
        try {
            const countries = await this.getAllCountries();
            return countries.flatMap(country => country.cities);
        } catch (error) {
            console.error("Erreur lors de la récupération de toutes les villes:", error);
            return [];
        }
    }

    static async getAllPlaces(): Promise<Place[]> {
        try {
            const cities = await this.getAllCities();
            return cities.flatMap(city => Object.values(city.places).flat());
        } catch (error) {
            console.error("Erreur lors de la récupération de tous les lieux:", error);
            return [];
        }
    }

    static async getTopPlacesByCategory(category: keyof Places): Promise<Place[]> {
        try {
            const cities = await this.getAllCities();
            return cities.flatMap(city => city.places[category]).slice(0, 5);
        } catch (error) {
            console.error(`Erreur lors de la récupération des lieux par catégorie ${category}:`, error);
            return [];
        }
    }
    
    static async getTopPlacesByCity(cityId: number): Promise<Place[]> {
        try {
            const cities = await this.getAllCities();
            const city = cities.find(city => city.id === cityId);
            return city ? Object.values(city.places).flat() : [];
        } catch (error) {
            console.error(`Erreur lors de la récupération des lieux pour la ville #${cityId}:`, error);
            return [];
        }
    }

    static async getPlacesByCategory(category: keyof Places): Promise<Place[]> {
        try {
            const cities = await this.getAllCities();
            return cities.flatMap(city => city.places[category]);
        } catch (error) {
            console.error(`Erreur lors de la récupération des lieux par catégorie ${category}:`, error);
            return [];
        }
    }
}

export class DataServiceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DataServiceError';
    }

    public static dataFileNotFound(filePath: string): DataServiceError {
        return new DataServiceError(`Fichier de données non trouvé: ${filePath}`);
    }

    public static dataFileNotRead(filePath: string): DataServiceError {
        return new DataServiceError(`Impossible de lire le fichier de données: ${filePath}`);
    }
}

export default DataService;