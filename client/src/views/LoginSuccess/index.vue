<template>
  
</template>

<script>
import { mapActions } from 'vuex'
export default {
    methods: {
        ...mapActions('responders', ['loadResponder']),
        ...mapActions('account', ['loadAccount']),
    },
    async created(){
        this.loadAccount()
        this.loadResponder()
        this.$router.replace('/')
    }
}
</script>

<style>

</style>
