import Vue from 'vue'
import Vuex from 'vuex'
import { ROUTE_COMPLETE, ROUTE_LOAD } from './mutations-types'
import auth from './modules/auth'
import account from './modules/account'
import responders from './modules/responders'
import history from './modules/history'
import answers from './modules/answers'
import settings from './modules/settings'




Vue.use(Vuex)

const initialState = {
    routeLoading: null,
    dark: localStorage.getItem('dark') === 'true'
}

const mutations = {
    [ROUTE_LOAD](state){
        state.routeLoading = true
    },
    [ROUTE_COMPLETE](state){
        state.routeLoading = false
    },
    TOGGLE_DARK(state){
        state.dark = !state.dark
    }
}

const actions = {
    toggleDark({ commit, state }){
        localStorage.setItem('dark', !state.dark)
        commit('TOGGLE_DARK')
    }
}

export default new Vuex.Store({
    state: initialState,
    mutations,
    actions,
    modules: {
        auth,
        account,
        responders,
        history,
        answers,
        settings
    },
    strict: process.env.NODE_ENV !== 'production'
})