<template>
  <v-layout align-center justify-center fill-height>
    <v-progress-circular></v-progress-circular>
  </v-layout>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    methods: mapActions('auth', ['logout']),
    created(){
        this.logout()
        this.$store.commit('account/RESET')
        this.$store.commit('history/RESET')
        this.$store.commit('responders/RESET')
        this.$store.commit('answers/RESET')
        this.$store.commit('settings/RESET')
        this.$router.replace('/login')
    }
}
</script>
<style>
</style>
