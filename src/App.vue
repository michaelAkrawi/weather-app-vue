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

    <v-navigation-drawer class="settings-drawer" v-model="settingsDrawer" absolute temporary right>
      <v-subheader>Settings</v-subheader>
      <div class="switch-wrapper">
        <div>Fahrenheit</div>
        <v-switch
          @change="onUnitTypeChangeHandler"
          false-value="f"
          true-value="c"
          v-model="settings.temperatureUnits"
        ></v-switch>
        <div>Celcius</div>
      </div>
      <div class="switch-wrapper">
        <div>Light</div>
        <v-switch value="John"></v-switch>
        <div>Dark</div>
      </div>
    </v-navigation-drawer>

    <notifications group="alerts" position="bottom right" />
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data() {
    return {
      settingsDrawer: false,
      settings: {
        temperatureUnits: "f",
        theme: "light"
      }
    };
  },
  methods: {
    onUnitTypeChangeHandler() {
      debugger;
      this.$store.dispatch("setUnits", this.settings.temperatureUnits);
    }
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
  }
}
</style>>


