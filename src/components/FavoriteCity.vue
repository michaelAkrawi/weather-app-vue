<template>
  <div class="favorite-city" @click="showWeeklyForecast">
    <h3>{{city.text}}</h3>
    <h2>{{description}}</h2>
    <div>{{temperature}} ° {{getUnits.toUpperCase()}}</div>
  </div>
</template>   
  
<script>
import { getLocationWeather } from "../api/weather";
import { mapGetters } from "vuex";
import _ from "lodash";


export default {
  props: {
    city: Object
  },
  computed: {
    ...mapGetters(["getUnits"])
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
      const vm = this;
      getLocationWeather(this.city.key)
        .then(response => {
          if (response.status == 200) {
            this.description = response.data[0].WeatherText;
            const t = _.pickBy(response.data[0].Temperature, value => {
              return value.Unit.toLowerCase() === vm.getUnits;
            });
            this.temperature = t[Object.keys(t)[0]].Value;
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    showWeeklyForecast() {
      this.$router.push({ name: "home", params: { city: this.city } });
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
  cursor: pointer;
}
</style>