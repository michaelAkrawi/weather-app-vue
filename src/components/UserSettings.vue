<template>
  <v-navigation-drawer class="settings-drawer" v-model="drawer" absolute temporary right>
    <v-subheader>Settings</v-subheader>
    <div class="switch-wrapper">
      <div>Fahrenheit</div>
      <v-switch
        @change="onUnitTypeChangeHandler"
        false-value="f"
        true-value="c"
        v-model="temperatureUnits"
      ></v-switch>
      <div>Celcius</div>
    </div>
    <div class="switch-wrapper">
      <div>Light</div>
      <v-switch value="John"></v-switch>
      <div>Dark</div>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["value"],
  watch: {
    value() {
      this.drawer = this.value;
    },
    drawer() {
      this.$emit("input", this.drawer);
    }
  },
  data() {
    return {
      temperatureUnits: "f",
      theme: "light",
      drawer: this.value
    };
  },

  methods: {
    onUnitTypeChangeHandler() {
      this.$store.dispatch("setUnits", this.settings.temperatureUnits);
    }
  }
};
</script>