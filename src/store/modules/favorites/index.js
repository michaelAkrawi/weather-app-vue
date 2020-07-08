

const state = {
    favorites: []
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
    },
    removeFavoriteCityHandler(state, city) {
        const index = state.favorites.findIndex(f => {
            return f.key == city.key;
        })
        if (index != -1) {
            state.favorites.splice(index, 1);
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

