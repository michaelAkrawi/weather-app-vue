const storageKey = 'user-favorites';

const state = {
    favorites: localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : []
}

const getters = {
    getUserFavorites: state => { return state.favorites }
}

const actions = {
    storeFavoriteCity(context, payload) {
        context.commit('storeFavoriteCityHandler', payload)
    },
    removeFavoriteCity(context, payload) {
        context.commit('removeFavoriteCityHandler', payload);
    }
}

const mutations = {
    storeFavoriteCityHandler(state, city) {
        state.favorites.push(city);
        localStorage.setItem(storageKey, JSON.stringify(state.favorites));
    },
    removeFavoriteCityHandler(state, city) {
        const index = state.favorites.findIndex(f => {
            return f.key == city.key;
        })
        if (index != -1) {
            state.favorites.splice(index, 1);
            localStorage.setItem(storageKey, JSON.stringify(state.favorites));
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

