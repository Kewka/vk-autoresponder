import { FETCHING_ERROR, FETCHING_START, AUTH_COMPLETE, RESET_STATE, LOGOUT } from './mutations-types'
import { callMethod } from '@/utils/api'

const initialState = {
    pending: false,
    type: null,
    isLoggedIn: !!localStorage.getItem('access_token'),
    error: null
}

const getters = {}

const mutations = {
    [FETCHING_START](state, type){
        state.pending = true
        state.error = null
        state.type = type;
    },
    [FETCHING_ERROR](state, error){
        state.pending = false
        state.error = error
    },
    [AUTH_COMPLETE](state){
        state.pending = false
        state.isLoggedIn = true
    },
    [RESET_STATE](state){
        state.pending = false
        state.error = null
    },
    [LOGOUT](state){
        state.isLoggedIn = false;
    }
}

const actions = {
    async login({ commit }, params){
        commit(FETCHING_START, params.code && !params.username ? 'code' : 'direct')
        try {
            const result = await callMethod('auth.login', params)
            if (result.access_token){
                localStorage.setItem('access_token', result.access_token)
                commit(AUTH_COMPLETE)
            }
            else if (result.error) commit(FETCHING_ERROR, result)
        } catch (e){
            console.error(e)
            commit(FETCHING_ERROR, { error: 'connection_problem', error_description: 'Request failed.' })
        }
    },
    async reset({ commit }){
        commit(RESET_STATE)
    },
    async logout({ commit }){
        localStorage.removeItem('access_token')
        commit(LOGOUT)
    }
}

export default {
    namespaced: true,
    state: initialState,
    actions,
    mutations,
    getters
}