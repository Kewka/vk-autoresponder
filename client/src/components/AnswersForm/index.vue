<template>
    <v-layout column>
        <v-subheader>Добавление ответа</v-subheader>
        <v-container fluid>
            <v-layout v-html="description"></v-layout>
            <v-form @submit.prevent="add({ pattern, answer, in_online: +in_online })">
                <v-text-field v-model="pattern" label="Шаблон" hint=".* - любое сообщение" required clearable></v-text-field>
                <v-text-field v-model="answer" label="Ответ" required clearable></v-text-field>
                <v-checkbox  v-model="in_online" label="Отвечать в режиме онлайн"></v-checkbox>
                <v-layout justify-end>
                    <v-btn :disabled="!(pattern && pattern.length && answer && answer.length)" type="submit" color="primary">Добавить</v-btn>
                </v-layout>         
            </v-form>
        </v-container>
    </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import description from './description'
export default {
    data(){
        return {
            pattern: '.*',
            answer: 'В данный момент я не в сети, но обязательно отвечу позже.',
            in_online: false,
            description
        }
    },
    methods: mapActions('answers', ['add'])
}
</script>

<style>

</style>
