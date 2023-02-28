import { defineCustomElement } from 'vue'
import widget from './App.ce.vue'

const element = defineCustomElement(widget)
customElements.define('weather-widget', element)