import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
//import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  cityName: string = '';
  weatherData: any;
  locationNotFound: boolean = false;
  weatherImg: string = '';
  temperature: string = '--';
  description: string = '--';
  humidity: string = '--';
  windSpeed: string = '--';

  private apiKey = '9b28f47bd1a1b7b6564061e359ca8626';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  searchWeather() {
    this.http.get(`${this.apiUrl}?q=${this.cityName}&appid=${this.apiKey}`).subscribe(
      data => {
        this.weatherData = data;
        this.locationNotFound = false;
        this.updateWeatherDetails();
      },
      error => {
        this.locationNotFound = true;
        this.weatherData = null;
      }
    );
  }

  updateWeatherDetails() {
    if (this.weatherData) {
      this.temperature = `${Math.round(this.weatherData.main.temp - 273.15)}`;
      this.description = this.weatherData.weather[0].description.toUpperCase();
      this.humidity = this.weatherData.main.humidity;
      this.windSpeed = this.weatherData.wind.speed;

      switch (this.weatherData.weather[0].main) {
        case 'Clouds':
          this.weatherImg = './assets/cloud.jpg';
          break;
        case 'Clear':
          this.weatherImg = './assets/clear.jpg';
          break;
        case 'Rain':
          this.weatherImg = './assets/rain.jpg';
          break;
        case 'Mist':
          this.weatherImg = './assets/mist.jpg';
          break;
        case 'Snow':
          this.weatherImg = './assets/snow.jpg';
          break;
        case 'Dust':
          this.weatherImg = './assets/dust.jpg';
          break;
        case 'Drizzle':
          this.weatherImg = './assets/drizzle.jpg';
          break;
        case 'Haze':
          this.weatherImg = './assets/haze.jpg';
          break;
        default:
          this.weatherImg = '';
      }
    }
  }
}
/*
import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  cityName: string = '';
  weatherData: any;
  locationNotFound: boolean = false;
  weatherImg: string = '';
  temperature: string = '--';
  description: string = '--';
  humidity: string = '--';
  windSpeed: string = '--';

  constructor(private weatherService: WeatherService) { }

  searchWeather() {
    this.weatherService.getWeather(this.cityName).subscribe(
      data => {
        this.weatherData = data;
        this.locationNotFound = false;
        this.updateWeatherDetails();
      },
      error => {
        this.locationNotFound = true;
        this.weatherData = null;
      }
    );
  }

  updateWeatherDetails() {
    if (this.weatherData) {
      this.temperature = `${Math.round(this.weatherData.main.temp - 273.15)}`;
      this.description = this.weatherData.weather[0].description.toUpperCase();
      this.humidity = this.weatherData.main.humidity;
      this.windSpeed = this.weatherData.wind.speed;

      switch (this.weatherData.weather[0].main) {
        case 'Clouds':
          this.weatherImg = './assets/cloud.jpg';
          break;
        case 'Clear':
          this.weatherImg = './assets/clear.jpg';
          break;
        case 'Rain':
          this.weatherImg = './assets/rain.jpg';
          break;
        case 'Mist':
          this.weatherImg = './assets/mist.jpg';
          break;
        case 'Snow':
          this.weatherImg = './assets/snow.jpg';
          break;
        case 'Dust':
          this.weatherImg = './assets/dust.jpg';
          break;
        case 'Drizzle':
          this.weatherImg = './assets/drizzle.jpg';
          break;
        case 'Haze':
          this.weatherImg = './assets/haze.jpg';
          break;
        default:
          this.weatherImg = '';
      }
    }
  }
}
  */
