import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import favorites from "./modules/favorites";
import settings from "./modules/settings"

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        favorites,
        settings
    },
    plugins: [vuexLocal.plugin]
});
