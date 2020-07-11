<template>
  <div class="daily-forecast-wrapper">
    <h3>{{getDay()}}</h3>
    <div>{{forecast.Day.IconPhrase}}</div>
    <div>
      <img :src="getIconURL()" />
    </div>
    <div>{{getAverageTemp()}} °{{getUnits.toUpperCase()}}</div>
  </div>
</template>

<script>
import { getDayText } from "../helpers/helper";
import { mapGetters } from "vuex";

export default {
  props: {
    forecast: Object
  },
  computed: {
    ...mapGetters(["getUnits"])
  },
  methods: {
    getDay() {
      const date = new Date(this.forecast.Date);
      return getDayText(date);
    },
    getIconURL() {
      const identifier = this.forecast.Day.Icon.toString().padStart(2, "0");
      return `https://developer.accuweather.com/sites/default/files/${identifier}-s.png`;
    },
    getAverageTemp() {
      const {
        Temperature: { Maximum }
      } = this.forecast;

      const {
        Temperature: { Minimum }
      } = this.forecast;

      return Math.ceil((Maximum.Value + Minimum.Value) / 2);
    }
  }
};
</script>

<style scoped>
.daily-forecast-wrapper {
  padding: 0.75rem;
  border: thin solid rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0rem 0.75rem 0rem 0.75rem;
  margin-bottom: 1rem;
}
</style>

