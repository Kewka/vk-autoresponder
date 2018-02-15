<template>
  <v-dialog persistent :value="show" max-width="600px">
        <v-form v-if="error" @submit.prevent="submit()">
            <v-card>
                <v-card-title class="headline">Подтверждение входа</v-card-title>
                <v-card-text class="text-xs-center">
                    <p>На Ваш номер телефона ({{ error.phone_mask }}) отправлено SMS с кодом подтверждения.</p>
                    <v-text-field type="number" v-model="code" single-line label="Введите код подтверждения"/>
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
            code: ''
        }
    },
    methods: {
        submit(){
            this.$emit('submit', { code: this.code })
        }
    },
    props: ['show', 'error']
}
</script>

<style>

</style>
