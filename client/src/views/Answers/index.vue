<template>
  <v-container class="elevation-3">
      <answers-form></answers-form>
      <p v-if="error" class="red--text text-xs-center" v-text="error.error_msg"></p>
      <answers-list class="pt-2"></answers-list>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AnswersForm from '@/components/AnswersForm'
import AnswersList from '@/components/AnswersList'
export default {
    methods: mapActions('answers', ['load']),
    computed: mapState('answers', ['error']),
    created(){
       this.load() 
    },
    components: {
        AnswersForm,
        AnswersList
    }
}
</script>

<style>

</style>
