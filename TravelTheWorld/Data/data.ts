import fs from 'fs';
import path from 'path';



export interface Country {
    id: number;
    name: string;
    cities: City[];
}

export interface City {
    id: number;
    name: string;
    description: string;
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
    private dataPath: string;

    constructor(dataPath: string) {
        this.dataPath = dataPath;
    }

    
    public getData(): any {
        try {
            const filePath = path.resolve(this.dataPath);
            const rawData = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(rawData);
        } catch (error) {
            console.error('Error reading or parsing data:', error);
            return null;
        }
    }

    public getAllCountries(): Country[] | null {
        const data = this.getData();
        return data ? (data.countries as Country[]) : null
    }

    public getCountryById(id: number): Country | null {
        const countries = this.getAllCountries();
        return countries ? countries.find(country => country.id === id) || null : null;
    }

    public getCityById(countryId: number, cityId: number): City | null {
        const country = this.getCountryById(countryId);
        return country ? country.cities.find(city => city.id === cityId) || null : null;
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