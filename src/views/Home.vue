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
import { fetchLoacations } from "../api/weather";
import CityWeather from "../components/CityWeather";

export default {
  data() {
    return {
      selectedCity: { key: 215854, text: "Tel Aviv" },
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
    }

    // if (window.navigator.geolocation) {
    //   window.navigator.getCurrentPosition(
    //     position => {
    //       console.log(position);
    //     },
    //     () => {
    //       console.log("failed to get youur location");
    //     }
    //   );
    // }      
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
          .catch(error => {
            console.error(error);
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

