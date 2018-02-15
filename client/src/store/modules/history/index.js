import { FETCHING_ERROR, FETCHING_START, SET_HISTORY, RESET } from './mutations-types'
import { callMethod } from '@/utils/api'

const initialState = {
    pending: false,
    items: null,
    error: null
}

const getters = {}

const mutations = {
    [FETCHING_START](state){
        state.pending = true
        state.error = null
    },
    [FETCHING_ERROR](state, error){
        state.pending = false
        state.error = error
    },
    [SET_HISTORY](state, items){
        state.pending = false
        state.items = items
    },
    [RESET](state){
        state.items = null
        state.error = null
        state.pending = false
    }
}

const actions = {
    async load({ commit }){
        try {
            commit(FETCHING_START)
            const result = await callMethod('history.get')
            if (result.error || result.error_code) await commit(FETCHING_ERROR, result)
            else commit(SET_HISTORY, result)
        } catch (e){
            console.error(e)
        }
    },
    async clear({ commit }){
        try {
            commit(FETCHING_START)
            const result = await callMethod('history.clear')
            if (result.response) commit(SET_HISTORY, [])
        } catch (e){
            console.error(e)
        }
    }
}

export default {
    namespaced: true,
    state: initialState,
    actions,
    mutations,
    getters
}