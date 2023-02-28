<template>
    <div class="w-card">
        <h2 class="w-card__title">{{ this.weather.name }}, {{ this.weather.country }}</h2>
        <div class="w-card__info">
            <img :src="'https://openweathermap.org/img/wn/' + this.weather.icon + '@2x.png'" :alt="this.weather.description">
            <div class="w-card__temp">{{ this.weather.temp }}</div>
            <div class="w-card__tempfeels">
                feels like
                {{ this.weather.feels_like }}
            </div>
            <div class="w-card__wind">
                <img src="@/assets/img/ui/wind.svg">
                {{ this.weather.wind_speed }} m/s, {{ this.weather.wind_direction }}
            </div>
            <div class="w-card__airwet">
                <img src="@/assets/img/ui/wet-air.svg">
                {{ this.weather.humidity }}%
            </div>
            <div class="w-card__pressure">
                <img src="@/assets/img/ui/pressure.svg">
                {{ this.weather.pressure }} mmHg
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'card',
    props: {
        weather: {
            type: Object,
            required: true
        }
    }
}
</script>