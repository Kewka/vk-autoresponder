<template>
  <v-container class="elevation-3">
      <template v-if="user">
        <v-tooltip left>
            <v-btn :href="`https://vk.com/id${user.id}`" fab fixed right bottom dark color="pink" slot="activator">
                <v-icon>open_in_new</v-icon>
            </v-btn>
            <span>Открыть на vk.com</span>
        </v-tooltip>
        <v-layout class="pa-1" justify-end>
            <span v-if="!user.online" class="caption" v-text="lastSeen"></span>
            <span v-else>Online <v-icon v-if="user.online_mobile" small v-text="'phone_android'"></v-icon></span>
        </v-layout>
        <v-layout style="word-break: break-word" class="pa-2" column align-center>
            <v-avatar class="ma-2" :size="$vuetify.breakpoint.width < 480 ? '140px' : '192px'">
                <img :src="user.photo_max" alt="">
            </v-avatar>
            <h4 :class="{'display-1': $vuetify.breakpoint.width > 480, 'headline': $vuetify.breakpoint.width < 480,'text-xs-center': true}">
                {{ user.first_name }} {{ user.last_name }}
            </h4>
            <p class="text-xs-center">{{ user.status }}</p>
        </v-layout>
      </template>
        <v-progress-linear v-show="pending" class="ma-0 pa-0" height="2" indeterminate></v-progress-linear>
        <v-divider></v-divider>
        <account-counters v-if="user && user.counters" :counters="user.counters"></account-counters>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
import platforms from './platforms'
import AccountCounters from '@/components/AccountCounters'
export default {
    data(){
        return {
            moment
        }
    },
    methods: mapActions('account', ['loadAccount']),
    computed: {
        ...mapState('account', ['user', 'pending']),
        lastSeen(){
            const call = `заходил${this.user.sex === 1 ? 'а' : ''}`
            const platform = `(${platforms[this.user.last_seen.platform]})`
            const time = `${moment.unix(this.user.last_seen.time).format('D MMMM в HH:mm')}`
            return `${call} ${time} ${platform}`
        }

    },
    created(){
        this.loadAccount()
    },
    components: {
        AccountCounters
    }
}
</script>

<style>

</style>
