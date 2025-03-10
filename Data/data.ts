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



export class DataService {

    static dataPath: string = "PaysVilleDescription.json";

    static setDataPath(dataPath: string): void {
        this.dataPath = dataPath;
    }

    
    static async getData(): Promise<any> {
        try {
            const data = jsonData;
            return data;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getAllCountries(): Promise<Country[] | null> {
        const data = await this.getData();
        return data ? data.countries : null;
    }

    static async getCountryById(countryId: number): Promise<Country | null> {
        const countries = await this.getAllCountries();
        return countries ? countries.find(country => country.id === countryId) || null : null;
    }

    static async getCityById(countryId: number, cityId: number): Promise<City | null> {
        const country = await this.getCountryById(countryId);
        return country ? country.cities.find(city => city.id === cityId) || null : null;
    }

    static async getAllCities(): Promise<City[] | null> {
        const countries = await this.getAllCountries();
        return countries ? countries.flatMap(country => country.cities) : null;
    }

    static async getAllPlaces(): Promise<Place[] | null> {
        const cities = await this.getAllCities();
        return cities ? cities.flatMap(city => Object.values(city.places).flat()) : null;
    }
}

export class DataServiceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DataServiceError';
    }

    public static dataFileNotFound(filePath: string): DataServiceError {
        return new DataServiceError(`Data file not found: ${filePath}`);
    }

    public static dataFileNotRead(filePath: string): DataServiceError {
        return new DataServiceError(`Data file could not be read: ${filePath}`);
    }

}