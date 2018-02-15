import { FETCHING_ERROR, FETCHING_START, SET_HISTORY, RESET, ADD_ANSWER, REMOVE_ANSWER, SET_ANSWERS } from './mutations-types'
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
    [SET_ANSWERS](state, items){
        state.pending = false
        state.items = items
    },
    [ADD_ANSWER](state, answer){
        state.pending = false
        state.items = [answer, ...state.items]
    },
    [REMOVE_ANSWER](state, id){
        state.pending = false        
        state.items = state.items.filter(item => item.id !== id)
    },
    [RESET](state){
        state.pending = false
        state.items = null
        state.error = null
    }
}

const actions = {
    async load({ commit }){
        try {
            commit(FETCHING_START)
            const result = await callMethod('answers.get')
            if (result.error || result.error_code) await commit(FETCHING_ERROR, result)
            else commit(SET_ANSWERS, result)
        } catch (e){
            console.error(e)
        }
    },
    async add({ commit }, answer){
        try {
            commit(FETCHING_START)
            const result = await callMethod('answers.add', answer)
            if (result.error || result.error_code) await commit(FETCHING_ERROR, result)
            if (result.id) commit(ADD_ANSWER, { ...answer, ...result })
        } catch (e){
            console.error(e)
        }
    },
    async remove({ commit }, id){
        try {
            commit(FETCHING_START)            
            const result = await callMethod('answers.remove', { id })
            if (result.response) commit(REMOVE_ANSWER, id)
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