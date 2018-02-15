<template>
  <v-layout fill-height column align-center justify-center>
      <v-progress-circular indeterminate></v-progress-circular>
      <p class="text-xs-center" v-if="this.$route.query.url">Переход на внешний <a :href="this.$route.query.url">источник</a></p>
  </v-layout>
</template>

<script>
export default {
    created(){
        this.$route.query.url ? window.location.replace(this.$route.query.url) : this.$router.replace('/')
    }
}
</script>

<style>

</style>
