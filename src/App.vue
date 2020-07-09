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

        <v-btn icon @click="settingsDrawer = true">
          <v-icon>mdi-cog-outline</v-icon>
        </v-btn>
      </v-app-bar>
    </div>

    <v-container fluid>
      <router-view></router-view>
    </v-container>

    <user-settings v-model="settingsDrawer"></user-settings>

    <notifications group="alerts" position="bottom right" />
  </v-app>
</template>

<script>
import UserSettings from "./components/UserSettings";

export default {
  name: "App",
  components: {
    UserSettings
  },
  data() {
    return {
      settingsDrawer: false
    };
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");
html {
  overflow-y: hidden;
  body {
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    .app-bar-link {
      text-decoration: none;
      margin-left: 0.675rem;
    }
    .settings-drawer {
      padding: 0.75rem;
      .switch-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .container {
      overflow-y: auto;
    }
  }
}
</style>>


