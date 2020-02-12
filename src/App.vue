

<template>
  <div>
    <v-app-bar color="rgb(120, 70, 161)" dark dense>
      <v-toolbar-title>Herolo Weather</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-app-bar>

    <dashboard></dashboard>
  </div>
</template>

<script>
import Dashboard from "./components/Dashboard";

export default {
  name: "App",

  components: {
    Dashboard
  },

  data: () => ({
    //
  })
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

body {
  font-family: "Montserrat", sans-serif;
}
</style>
