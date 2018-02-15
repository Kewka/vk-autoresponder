<template>
  <v-card class="transparent" flat>
      <v-form @submit.prevent="submit()">
        <v-text-field required label="Номер телефона или e-mail" v-model="username"></v-text-field>
        <v-text-field required type="password" label="Пароль" v-model="password"></v-text-field>
        <p class="red--text ma-0 text-xs-center" v-if="error && type === 'direct'" v-text="error.error_description || error.error_msg || ''"></p>
        <v-layout justify-end wrap>
             <v-btn href="https://vk.com/restore" target="_blank">Забыли пароль?</v-btn>            
             <v-btn type="submit" color="primary" :loading="pending">Войти</v-btn>
        </v-layout>
      </v-form>
      <captcha-dialog :show="error && error.error === 'need_captcha'" :error="error" @submit="submit($event)"></captcha-dialog>
      <validation-dialog :show="error && error.error === 'need_validation'" :error="error" @submit="submit($event)"></validation-dialog>

  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CaptchaDialog from './CaptchaDialog'
import ValidationDialog from './ValidationDialog'

export default {
  data(){
    return {
      username: '',
      password: '',
      code: '',
      captcha_key: ''
    }
  },
  methods: {
    async submit(extraParams = {}){
      const { username, password } = this
      await this.login({ username, password, ...extraParams })
      this.isLoggedIn && this.$router.replace('/login-success')
    },
    ...mapActions('auth', ['login']),
    
  },
  computed: {
    ...mapState('auth', ['error', 'isLoggedIn', 'pending', 'type'])
  },
  components: {
    ValidationDialog,
    CaptchaDialog
  }

}
</script>

<style>

</style>
