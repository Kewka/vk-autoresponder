<template>
  <v-dialog persistent :value="show" max-width="500px">
        <v-form v-if="error" @submit.prevent="submit()">
            <v-card>
                <v-card-title class="headline">Я не робот</v-card-title>
                <v-card-text class="text-xs-center">
                    <img center :src="error.captcha_img" alt="">
                    <v-text-field v-model="captcha_key" single-line label="Введите капчу"/>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" flat color="primary">Подтвердить</v-btn>
                </v-card-actions>
            </v-card>
          </v-form>
      </v-dialog>
</template>

<script>
export default {
    data(){
        return {
            captcha_key: ''
        }
    },
    methods: {
        submit(){
            this.$emit('submit', { captcha_key: this.captcha_key, captcha_sid: this.error.captcha_sid })
        }
    },
    props: ['show', 'error']
}
</script>

<style>

</style>
