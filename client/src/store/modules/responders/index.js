import { FETCHING_ERROR, FETCHING_START, SET_ACTIVE_RESPONDERS, SET_ENABLED, RESET } from './mutations-types'
import { callMethod } from '@/utils/api'

const initialState = {
    pending: false,
    activeResponders: null,
    enabled: null,
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
    [SET_ENABLED](state, { enabled }){
        state.pending = false
        state.enabled = !!enabled
    },
    [SET_ACTIVE_RESPONDERS](state, responders){
        state.pending = false
        state.activeResponders = responders
    },
    [RESET](state){
        state.pending = false
        state.activeResponders = null
        state.enabled = null
        state.error = null
    }
}

const actions = {
    async loadActive({ commit }){
        try {
            commit(FETCHING_START)
            const result = await callMethod('responders.getActive')
            if (result.error || result.error_code) await commit(FETCHING_ERROR, result)
            else await commit(SET_ACTIVE_RESPONDERS, result.filter(item => !item.deactivated))
        } catch (e){
            console.error(e)
        }
    },
    async loadResponder({ commit }){
        try {
            commit(FETCHING_START)
            const result = await callMethod('responders.getEnabled')
            if(result.error || result.error_code) await commit(FETCHING_ERROR, result)
            else await commit(SET_ENABLED, result)
        } catch (e) {
            console.error(e)
        }
    },
    async toggleResponder({ commit, state }){
        try {
            commit(FETCHING_START)
            const result = await callMethod('responders.setEnabled', { enabled: +!state.enabled })
            if(result.error || result.error_code) await commit(FETCHING_ERROR, result)
            else await commit(SET_ENABLED, { enabled: result.enabled })
        } catch (e) {
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