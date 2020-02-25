<template>
  <div class="favorite-city">
    <h3>{{city.text}}</h3>
    <h2>{{description}}</h2>
    <div>{{temperature}}</div>
  </div>
</template>   
  
<script>
import { getLocationWeather } from "../api/weather";

export default {
  props: {
    city: Object
  },
  data() {
    return {
      description: "",
      temperature: ""
    };
  },
  created() {
    this.fetchCityWeather();
  },
  methods: {
    fetchCityWeather() {
      getLocationWeather(this.city.key)
        .then(response => {
          if (response.status == 200) {
            this.description = response.data[0].WeatherText;
            this.temperature = response.data[0].Temperature.Imperial.Value;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.favorite-city {
  padding: 0.75rem;
  border: thin solid rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0rem 0.75rem 0rem 0.75rem;
  width: 15rem;
  margin-bottom: 1rem;
}
</style>