import dotenv from 'dotenv';
dotenv.config();

// interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// class for the Weather object
class Weather {
  city: string;
  date: string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  icon: string;
  iconDescription: string;

  constructor(
    city: string,
    date: string,
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
      const response = await fetch(
        `${this.baseURL}/geocode?city=${query}&apikey=${this.apiKey}`
      );
      const locationData = await response.json();
      return locationData;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData;
    return { lat, lon };
  }

  // buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geocode?city=${this.city}&apikey=${this.apiKey}`;
  }

  // buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&apikey=${this.apiKey}`;
  }

  // fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    return await this.fetchLocationData(this.buildGeocodeQuery()).then((locationData) =>
      this.destructureLocationData(locationData)
    );
  }

  // fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const response = await fetch(this.buildWeatherQuery(coordinates));
      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const currentWeather = response.data[0];
    const { city_name, datetime, temp, wind_spd, rh, weather } = currentWeather;
    return new Weather(city_name, datetime, temp, wind_spd, rh, weather.icon, weather.description);
  }

  // buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecast: Weather[] = [];
    forecast.push(currentWeather);

    for (let i = 1; i < 5; i++) {
      const { city_name, datetime, temp, wind_spd, rh, weather } = weatherData[i];
      forecast.push(new Weather(city_name, datetime, temp, wind_spd, rh, weather.icon, weather.description));
    }

    return forecast;
  }

  // getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.city = city;

    try {
      const coordinates = await this.fetchAndDestructureLocationData();
      const weatherData = await this.fetchWeatherData(coordinates);

      const currentWeather = this.parseCurrentWeather(weatherData);
      const forecast = this.buildForecastArray(currentWeather, weatherData.data);

      return forecast;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

export default new WeatherService();
