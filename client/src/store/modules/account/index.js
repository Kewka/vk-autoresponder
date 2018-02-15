import { FETCHING_ERROR, FETCHING_START, USER_COMPLETE, RESET } from './mutations-types'
import { callMethod } from '@/utils/api'
import router from '@/router'

const initialState = {
    pending: false,
    user: null,
    error: null,
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
    [USER_COMPLETE](state, user){
        state.pending = false
        state.user = user
    },
    [RESET](state){
        state.user = null
        state.error = null
        state.pending = false
    }
}

const actions = {
    async loadAccount({ commit }){
        commit(FETCHING_START)
        try {
            const result = await callMethod('account.get')
            if (result.error || result.error_code) {
                if (result.error_code === 5) router.replace('/logout')
                else commit(FETCHING_ERROR, result)
            }
            else commit(USER_COMPLETE, result)
        } catch (e){
            console.error(e)
            commit(FETCHING_ERROR, { error: 'connection_problem', error_msg: 'Request failed.' })
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