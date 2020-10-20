<template>
  <div class="city-weather-wrapper">
    <div class="city-weather-info">
      <div class="city-weather-header">
        <div>
          <div>{{city.text}}</div>
          <div>{{state.temperature}} °{{getUnits.toUpperCase()}}</div>
        </div>
        <div>
          <v-btn
            icon
            :title="isFavorite ?  'remove from favorites' : 'add to favorties'"
            @click="setFavoriteState"
          >
            <v-icon :class="{'favorite-city' : isFavorite}">mdi-heart</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="city-weather-desctiption mt-4">
        <h2>{{state.description}}</h2>
      </div>
      <div class="city-weekly-forceast">
        <daily-forecast v-bind:key="f.Date" v-for="f in state.forecast" :forecast="f"></daily-forecast>
      </div>
    </div>
  </div>
</template>


<script>
import { getLocationWeather, getWeeklyForecast } from "../api/weather";
import { reactive, watch, computed } from "@vue/composition-api";
import { useGetters } from "vuex-composition-helpers";

import DailyForecast from "./DailyForecast";
import _ from "lodash";

export default {
  components: {
    DailyForecast,
  },
  setup(props, { root }) {
    const state = reactive({
      temperature: "",
      description: "",
      forecast: [],
    });

    const { getUnits, getUserFavorites } = useGetters([
      "getUnits",
      "getUserFavorites",
    ]);
    const isFavorite = computed(
      () =>
        getUserFavorites.value.find((c) => c.key == props.city.key) !==
        undefined
    );

    watch(
      () => props.city.key,
      () => {
        getWeather();
        setForecast();
      }
    );
    watch(() => getUnits, getWeather);

    function getWeather() {
      getLocationWeather(props.city.key).then((response) => {
        if (response.status == 200) {
          if (response.data.length > 0) {
            state.description = response.data[0].WeatherText;
            const t = _.pickBy(response.data[0].Temperature, (value) => {
              return value.Unit.toLowerCase() === getUnits.value;
            });
            state.temperature = t[Object.keys(t)[0]].Value;
          }
        }
      });
    }

    function setForecast() {
      getWeeklyForecast(props.city.key, true).then((response) => {
        if (response.status == 200)
          state.forecast = response.data.DailyForecasts;
      });
    }

    function setFavoriteState() {
      if (isFavorite.value)
        root.$store.dispatch("storeFavoriteCity", props.city);
      else root.$store.dispatch("removeFavoriteCity", props.city);
      
    }

    return {
      state,
      isFavorite,
      setFavoriteState,
      getUnits,
    };
  },

  props: {
    city: Object,
  },
};
</script>

<style lang="scss" scoped>
.city-weather-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .city-weather-header {
    display: flex;
    justify-content: space-between;
    .favorite-city {
      color: #e53935 !important;
    }
  }
  .city-weather-desctiption {
    display: flex;
    justify-content: center;
  }
  .city-weekly-forceast {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    > div {
      flex-basis: 17%;
    }
  }
}
</style>

<style scoped>
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
