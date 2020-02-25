<template>
  <v-app>
    <div>
      <v-app-bar color="rgb(120, 70, 161)" dark dense>
        <v-toolbar-title>Herolo Weather</v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link title="Home" to="/weather/home" class="app-bar-link">
          <v-icon>mdi-home</v-icon>
        </router-link>

        <router-link title="Favorites" to="/weather/favorites" class="app-bar-link">
          <v-icon>mdi-heart</v-icon>
        </router-link>
      </v-app-bar>
    </div>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
    <notifications group="alerts" position="bottom right" />
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

body {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
}

.app-bar-link {
  text-decoration: none;
  margin-left: 0.675rem;
}
</style>
