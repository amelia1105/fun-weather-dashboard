import dayjs, { type Dayjs } from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

// interface for the Coordinates object
interface Coordinates {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

// class for the Weather object
class Weather {
  city: string;
  date: Dayjs | string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  icon: string;
  iconDescription: string;
  
  constructor(
    city: string,
    date: Dayjs | string,
    tempF: number,
    windSpeed: number,
    humidity: number,
    icon: string,
    iconDescription: string
  ) {
    this.city = city;
    this.date = date;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.icon = icon;
    this.iconDescription = iconDescription;
    }
}

// WeatherService class
class WeatherService {
  // define the baseURL, API key, and city name properties
  private baseURL?: string;
  private apiKey?: string;
  private city = '';

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
  }

  // fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      const response: Coordinates[] = await fetch(query).then((res) => res.json());
      return response[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // destructureLocationData method
  private destructureLocationData(cityData: Coordinates): Coordinates {
    if (!cityData) {
      throw new Error('City cannot be found, please try again.');
    } else {
      const { name, lat, lon, country, state } = cityData;
      const coordinates: Coordinates = { name, lat, lon, country, state };
      return coordinates;
    }
  }

  // buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    const geocode = `${this.baseURL}/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.apiKey}`;
    return geocode;
  }

  // buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const weather = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
    return weather;
  }

  // fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    return await this.fetchLocationData(this.buildGeocodeQuery()).then((data) => this.destructureLocationData(data));
  }

  // fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const response = await fetch(this.buildWeatherQuery(coordinates)).then((res) => res.json());
      if (!response) {
        throw new Error('Weather data is not available for this city.');
      } else {
      const currentWeather: Weather = this.parseCurrentWeather(response.list[0]);
      const forecast: Weather[] = this.buildForecastArray(currentWeather, response.list);
      return forecast;
      }
    } catch (error: any) {
      console.error(error);
      return error;
    }
  }

  // parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const date = dayjs.unix(response.dt).format('M/D/YYYY');
    const weather = new Weather(
      this.city,
      date,
      response.main.temp,
      response.wind.speed,
      response.main.humidity,
      response.weather[0].icon,
      response.weather[0].description || response.weather[0].main
    );
    return weather;
  }

  // buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecast: Weather[] = [currentWeather];
    const filterWeather = weatherData.filter((data: any) => {
      return data.dt_txt.includes('12:00:00');});

    for (const day of filterWeather) {
      forecast.push(
        new Weather(
          this.city,
          dayjs.unix(day.dt).format('M/D/YYYY'),
          day.main.temp,
          day.wind.speed,
          day.main.humidity,
          day.weather[0].icon,
          day.weather[0].description || day.weather[0].main
        )
      );
    }
    return forecast;
  }

  // getWeatherForCity method
  async getWeatherForCity(city: string) {
    try {
      this.city = city;
      const coordinates = await this.fetchAndDestructureLocationData();
      if (coordinates) {
        const weather = await this.fetchWeatherData(coordinates);
        return weather;
      } else {
        throw new Error('Weather data not found');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new WeatherService();
