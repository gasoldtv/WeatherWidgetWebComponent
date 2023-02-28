<template>
    <div class="w-setting">
        <h2>Settings</h2>
        <draggable 
            tag="div"
            class="w-setting__cities"
            :list="cities"
            handle=".handle"
            item-key="id"
            @end="onEnd"
            ghost-class="w-ghost"
        >
            <template #item="{element}">
                <div class="w-setting__city w-city">
                    <button class="w-city__move handle" :style="`background-image: url(${require('@/assets/img/ui/hamburger.svg')})`"></button>
                        {{ element.name }}, {{element.country}}
                    <button class="w-city__remove" :style="`background-image: url(${require('@/assets/img/ui/trash.svg')})`" @click="this.$emit('removeCity', element)"></button>
                </div>
            </template>
        </draggable>   
        <h4>Add Location:</h4>
        <div class="w-input-wrapper">
            <input 
                type="text"
                class="w-input"
                :value="cityValue" 
                @input="getCityId" 
                @focus="focused = true" 
                @blur="focused = false" 
                placeholder="Insert more than 3 latters"
            />
            <button class="w-add-city" :style="`background-image: url(${require('@/assets/img/ui/enter.svg')})`" @click="pushCity"></button>
            <div 
                class="w-input-wrapper__dropdown w-input-wrapper__alert" 
                v-if="cityValue.length < 4 && focused"
            >
                Insert more than 3 latters
            </div>
            <div 
                class="w-input-wrapper__dropdown w-input-wrapper__alert" 
                v-else-if="results.length === 0 && cityValue !== '' && focused"
            >
                No results found
            </div>
            <div 
                class="w-input-wrapper__dropdown w-input-wrapper__cities" 
                v-else 
                v-for="result in results" :key="result.id" 
                @click="setCityToInput(result)"
            >
                {{result.name}}, {{result.country}}
            </div>
        </div>   
    </div>
</template>

<script>
import json from '@/assets/city.list.json'
import draggable from 'vuedraggable'

export default {
    name: 'WeatherSetting',
    props: {
        cities: {
            type: [Array, null],
            required: true
        }
    },
    components: {
        draggable
    },
    data () {
        return {
            citiesJson: json,
            results: [],
            currentCity: {},
            focused: false,
            cityValue: '',
        }
    },
    methods: {
        getCityId(e) {
            this.results = []
            this.currentCity = {}
            this.cityValue = e.target.value

            if (e.target.value.length > 3) {
                for (let i = 0; i < this.citiesJson.length; i++) {
                    let city = this.citiesJson[i].name.toLowerCase()
                    if (city.includes(this.cityValue.toLowerCase())) {
                        this.results.push(this.citiesJson[i])
                    }
                }
            }
        },
        setCityToInput(item) {
            this.cityValue = item.name
            this.currentCity = {id: item.id, name: item.name, country: item.country}
        },
        pushCity() {
            if (this.currentCity.hasOwnProperty('name')) {
                this.$emit('createCity', this.currentCity)
            }
            this.cityValue = ''
            this.currentCity = {}
            this.results = []
        },
        onEnd() {
            this.$emit('updateCities', this.cities)
            localStorage.setItem('cities', JSON.stringify(this.cities))
        }   
    },
    mounted() {  
        
    }
}
</script>