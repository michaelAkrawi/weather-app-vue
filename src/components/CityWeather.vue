<template>
  <div class="city-weather-wrapper">
    <div class="city-weather-info">
      <div class="city-weather-header">
        <div>
          <div>{{city.text}}</div>
          <div>{{temperature}} °{{getUnits.toUpperCase()}}</div>
        </div>
        <div>
          <v-btn icon title="Add To Favorites" @click="handleFavorites">
            <v-icon :class="{'favorite-city' : isFavorite}">mdi-heart</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="city-weather-desctiption mt-4">
        <h2>{{description}}</h2>
      </div>
      <div class="city-weekly-forceast">
        <daily-forecast v-bind:key="f.Date" v-for="f in forecast" :forecast="f"></daily-forecast>
      </div>
    </div>
  </div>
</template>


<script>
import { getLocationWeather, getWeeklyForecast } from "../api/weather";
import DailyForecast from "./DailyForecast";
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  components: {
    DailyForecast
  },
  computed: {
    cityKey() {
      return this.city.key;
    },
    isFavorite() {
      const item = this.getUserFavorites.find(f => {
        return f.key == this.city.key;
      });

      return item !== undefined;
    },
    ...mapGetters(["getUnits", "getUserFavorites"])
  },
  watch: {
    cityKey() {
      this.getWeather();
    },
    getUnits(){
      this.getWeather();
    }
  },
  created() {
    this.getWeather();
  },
  props: {
    city: Object
  },
  data() {
    return {
      temperature: "",
      description: "",
      forecast: []
    };
  },
  methods: {
    getWeather() {
      const vm = this;   
      getLocationWeather(this.city.key)
        .then(response => {
          if (response.status == 200) {
            if (response.data.length > 0) {
              this.description = response.data[0].WeatherText;
              const t = _.pickBy(response.data[0].Temperature, value => {
                return value.Unit.toLowerCase() === vm.getUnits;
              });
              this.temperature = t[Object.keys(t)[0]].Value;
            }
          }
        })
        .catch(error => {
          console.error(error);
        });

      debugger;

      getWeeklyForecast(this.city.key, this.getUnits.toLowerCase() == "c")
        .then(ressponse => {
          if (ressponse.status == 200) {
            this.forecast = ressponse.data.DailyForecasts;
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    handleFavorites() {
      if (!this.isFavorite) {
        this.$store.dispatch("storeFavoriteCity", this.city);
        this.$notify({
          group: "alerts",
          title: "Great",
          text: `${this.city.text} is now one of your favorites cities`,
          type: "success"
        });
      } else {
        this.$store.dispatch("removeFavoriteCity", this.city);
        this.$notify({
          group: "alerts",
          title: "Ooops",
          text: `${this.city.text} is no longer one of your favorites cities`,
          type: "warn"
        });
      }
    }
  }
};
</script>

<style scoped>
.city-weather-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.city-weather-header {
  display: flex;
  justify-content: space-between;
}

.city-weather-desctiption {
  display: flex;
  justify-content: center;
}

.city-weekly-forceast {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.favorite-city {
  color: #e53935 !important;
}
</style>

<style>
.city-favorite-alert .v-alert__content {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
}

.city-favorite-alert i {
  color: #fff !important;
}
</style>
