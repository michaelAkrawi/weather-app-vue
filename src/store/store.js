import Vue from 'vue'
import Vuex from 'vuex'


import favorites from "./modules/favorites";
import settings from "./modules/settings"

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        favorites,
        settings
    }
});
