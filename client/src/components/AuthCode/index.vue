<template>
  <v-card class="transparent" flat>
      <v-card-text>
          <v-expansion-panel class="my-2" expand>
                <v-expansion-panel-content v-for="(step, i) in steps" :key="i">
                <div slot="header">
                      <strong>Шаг {{ ++i }}:</strong>
                      <span v-text="step.title"></span>
                </div>
                <v-divider></v-divider>
                <v-card>
                    <v-card-text>
                        <p v-text="step.description"></p>
                        <v-layout class="justify-center align-center">
                            <img style="border: 1px solid #999; max-width: 80%" :src="step.image" alt="">
                        </v-layout>
                    </v-card-text>
                </v-card>
                </v-expansion-panel-content>
          </v-expansion-panel>       
          <v-layout justify-end>
              <v-btn href="/oauth" target="_blank">Получить код</v-btn>
          </v-layout>
          <v-divider class="my-3"></v-divider>
          <v-form @submit.prevent="submit()">
                  <v-text-field v-model="code" required label="Код для получения ключа доступа" placeholder="Введите код, полученный после аутентификации"></v-text-field>
                  <p class="red--text ma-0 text-xs-center" v-if="error && type === 'code'" v-text="error.error_description || error.error_msg || ''"></p>
                  <v-btn type="submit" block color="primary" :disabled="!code.length">Войти</v-btn>
          </v-form>
      </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import steps from './steps'
export default {
    data(){
        return {
            steps,
            code: ''
        }
    },
    methods: {
        async submit(){
        const { code } = this
        await this.login({ code })
        this.isLoggedIn && this.$router.replace('/login-success')
        },
        ...mapActions('auth', ['login']),
        
    },
    computed: {
        ...mapState('auth', ['error', 'isLoggedIn', 'pending', 'type'])
    },
}
</script>

<style>

</style>
