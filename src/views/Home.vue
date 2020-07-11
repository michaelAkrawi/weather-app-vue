<template>
  <div class="container">
    <div class="query-location-wrapper">
      <v-autocomplete
        :items="items"
        item-value="key"
        item-text="text"
        :search-input.sync="search"
        v-model="selectedCity"
        :loading="loading"
        return-object
        class="query-location"
        placeholder="Search City"
        prepend-inner-icon="mdi-magnify"
      ></v-autocomplete>
    </div>
    <city-weather v-if="selectedCity !== undefined" :city="selectedCity"></city-weather>
  </div>
</template>

<script>
import { fetchLoacations, fetchGeoposition } from "../api/weather";
import CityWeather from "../components/CityWeather";

export default {
  data() {
    return {
      selectedCity: undefined,
      loading: false,
      search: null,
      items: []
    };
  },
  components: {
    CityWeather
  },
  created() {
    const { city } = this.$route.params;
    if (city !== undefined) {
      this.selectedCity = city;
    } else if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        fetchGeoposition(position.coords.latitude, position.coords.longitude)
          .then(response => {
            if (response.status == 200) {
              this.selectedCity.key = response.data.Key;
              this.selectedCity.text = response.data.EnglishName;
            }
          })
          .catch(() => {
            this.$notify({
              group: "alerts",
              title: "Oops",
              text: `Seems like we are having some trubles`,
              type: "error"
            });
          });
      });
    }
  },
  watch: {
    search(val) {
      if (val !== "") {
        this.loading = true;
        fetchLoacations(val)
          .then(response => {
            this.items = [];
            if (response.status == 200) {
              response.data.forEach(element => {
                this.items.push({
                  key: element.Key,
                  text: element.LocalizedName
                });
              });
            }
          })
          .catch(() => {
            this.$notify({
              group: "alerts",
              title: "Oops",
              text: `We were unable to get data for requested city`,
              type: "error"
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  }
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

