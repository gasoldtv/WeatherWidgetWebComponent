<template>
    <weather-widget/>
</template>

<script>
import WeatherWidget from '@/components/WeatherWidget.vue'


export default {
  name: 'App',
  components: {
    WeatherWidget
  }
}
</script>

<style lang="scss">

@import './assets/scss/style.scss';

</style>