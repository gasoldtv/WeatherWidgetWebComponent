<template>
  <div class="w-widget">
    <img class="w-widget__setting" :src="require(`@/assets/img/ui/${iconName ? 'cross.svg' : 'settings.svg'}`)" @click="openSettings">
    <weather-card
      v-if="!iconName"
      v-for="weather of weathers"
      :weather="weather"
    />
    <weather-setting 
      v-if="iconName"
      @createCity = "createCity"
      @removeCity = "removeCity"
      @updateCities = "updateCities"
      :cities="cities"
    />
  </div>
</template>

<script>
import WeatherSetting from '@/components/WeatherSetting.vue'
import WeatherCard from '@/components/WeatherCard.vue'
import axios from 'axios'

export default {
  name: 'WeatherWidget',
  components: {
    WeatherSetting,
    WeatherCard
  },
  data () {
    return {
      iconName: false,
      cities: [],
      weathers: []
    }  
  },
  methods: {
    getDirection(deg) {
      let directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
      let index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;
      return directions[index];
    },
    getWeathers(city) {
      axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
              id: city.id,
              appid: '463c183a105d9779dadf839a7539d9df',
              units: 'metric',
          }
      }).then((response) => {
          let data = response.data
          this.weathers.push({
            id: data.id,
            name: data.name, 
            country: data.sys.country, 
            icon: data.weather[0].icon, 
            description: data.weather[0].description, 
            temp: Math.round(data.main.temp),
            feels_like: Math.round(data.main.feels_like),
            wind_speed: data.wind.speed,
            wind_direction: this.getDirection(data.wind.deg),
            humidity: data.main.humidity,
            pressure: data.main.pressure * 0.75
          })
      })
    },
    openSettings() {
      !this.iconName ? this.iconName = true : this.iconName = false 
    },
    createCity(city) {
      this.cities.push(city)
      localStorage.setItem('cities', JSON.stringify(this.cities))
      this.getWeathers(city)
    },
    removeCity(city) {
      this.cities = this.cities.filter(c => c.id !== city.id)
      localStorage.setItem('cities', JSON.stringify(this.cities))
      this.weathers = this.weathers.filter(w => w.id !== city.id)
    },
    updateCities(cities) {
      this.cities = cities
      let temp = []
      for (let city of this.cities) {
        for (let weather of this.weathers) {
          if (weather.id === city.id) {
            temp.push(weather)
          }
        }
      }
      this.weathers = temp
    }
  },
  mounted() {
    if (localStorage.getItem('cities') !== null && localStorage.getItem('cities') !== '[]') {
      this.cities = JSON.parse(localStorage.getItem('cities'))
    }else{
      axios.get('https://ipgeolocation.abstractapi.com/v1/', {
        params: {
            api_key: '47af7640bcc341c9bb716f882b867444',
        }
      }).then((response) => {
        let city = {id: response.data.city_geoname_id, name: response.data.city, country: response.data.country_code}
        this.cities.push(city)
        localStorage.setItem('cities', JSON.stringify(this.cities))
        this.getWeathers(city)
      })
    }

    for (let city of this.cities) {
      this.getWeathers(city)
    }
  }
}
</script>