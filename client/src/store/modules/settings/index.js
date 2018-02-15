import { FETCHING_ERROR, FETCHING_START, UPDATE_SETTINGS, RESET, SET_UPDATED, CHANGE_FIELD } from './mutations-types'
import { callMethod } from '@/utils/api'

const initialState = {
    pending: false,
    form: {
        active_chats: null,
        online_mode: null
    },
    updated: null,
    error: null
}

const getters = {}

const mutations = {
    [FETCHING_START](state){
        state.pending = true
        state.error = null
        state.updated = null
    },
    [FETCHING_ERROR](state, error){
        state.pending = false
        state.error = error
    },
    [UPDATE_SETTINGS](state, settings){
        state.pending = false
        state.form = settings
    },
    [RESET](state){
        state.pending = false
        state.form = null
        state.error = null
        state.updated = null
    },
    [SET_UPDATED](state){
        state.pending = false
        state.updated = true
    },
    [CHANGE_FIELD](state, { field, value }){
        state.form = { ...state.form, [field]: value }
    }
}


const actions = {
    async load({ commit }){
        try {
            commit(FETCHING_START)
            const result = await callMethod('settings.get')
            if (result.error || result.error_code) await commit(FETCHING_ERROR, result)
            else commit(UPDATE_SETTINGS, result)
        } catch (e){
            console.error(e)
        }
    },
    async update({ commit, state, dispatch }){
        try {
            commit(FETCHING_START)
            const { active_chats, online_mode } = state.form
            const result = await callMethod('settings.update', { active_chats: +active_chats, online_mode: +online_mode })
            if (result.error || result.error_code) await commit(FETCHING_ERROR, result)
            else if (result.response) commit(SET_UPDATED)
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