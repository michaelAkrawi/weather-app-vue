<template>
  <div class="container">
    <div class="query-location-wrapper">
      <v-autocomplete
        :items="state.items"
        item-value="key"
        item-text="text"
        :search-input.sync="state.search"
        v-model="state.selectedCity"
        :loading="state.loading"
        return-object
        class="query-location"
        placeholder="Search City"
        prepend-inner-icon="mdi-magnify"
      ></v-autocomplete>
    </div>
    <city-weather v-if="state.selectedCity !== undefined" :city="state.selectedCity"></city-weather>
  </div>
</template>

<script>
import { fetchGeoposition, fetchLoacations } from "../api/weather";
import CityWeather from "../components/CityWeather";
import { reactive, watch } from "@vue/composition-api";

export default {
  setup() {
    const state = reactive({
      selectedCity: { key: undefined, text: undefined },
      loading: false,
      search: null,
      items: [],
    });

    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        fetchGeoposition(
          position.coords.latitude,
          position.coords.longitude
        ).then((response) => {
          if (response.status == 200) {
            state.selectedCity.key = response.data.Key;
            state.selectedCity.text = response.data.EnglishName;
          }
        });
      });
    }

    watch(
      () => state.search,
      () => {
        if (state.search) {
          state.loading = true;
          fetchLoacations(state.search).then((response) => {
            if (response.status == 200) {
              state.items = response.data.map((m) => {
                return { key: m.Key, text: m.LocalizedName };
              });
            }
          });
        }
      }
    );

    return { state };
  },
  components: {
    CityWeather,
  },
};
</script>

<style lang="scss" scoped>
.query-location-wrapper {
  display: flex;
  justify-content: center;
  .query-location {
    max-width: 50vw;
  }
}
</style>

