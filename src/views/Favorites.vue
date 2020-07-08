<template>
  <div class="favorites-cities-wrapper">
    <template v-if="cities.length > 0">
      <favorite-city v-for="c in cities" :city="c" v-bind:key="c.key"></favorite-city>
    </template>
    <template v-else>
      <h3 class="no-favorites-message">Your Favorites List Is Empty</h3>
    </template>
  </div>
</template>

<script>
import FavoriteCity from "../components/FavoriteCity";

export default {
  created() {},
  components: {
    FavoriteCity
  },
  data() {
    return {
      cities: this.$store.getters.getUserFavorites
    };
  }
};
</script>

<style lang="scss" scoped>
.favorites-cities-wrapper {
  display: flex;
  justify-content: center;
  .no-favorites-message {    
    font-style: italic;
  }
}
</style>

