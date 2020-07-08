const state = {
    units: 'f',
    theme: 'light'
}

const getters = {
    getUnits: state => { return state.units; },

    getTheme: state => { return state.theme; }
}

const actions = {
    setUnits(context, unit) {        
        context.commit('setUnitsHandler', unit);
    }
}

const mutations = {
    setUnitsHandler(state, units) {
        state.units = units;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
