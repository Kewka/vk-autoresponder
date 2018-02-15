<template>
  <v-container class="elevation-3">
    <v-list class="transparent" two-line>
        <v-subheader>Основные</v-subheader>
        <v-list-tile :disabled="pending" v-for="(field, i) in primaryFields" :key="field.key" avatar>
            <v-list-tile-avatar><v-icon>{{ field.icon }}</v-icon></v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>{{ field.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ field.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action><v-switch :input-value="form[field.key]" @change="$store.commit('settings/CHANGE_FIELD', { field: field.key, value: $event })"></v-switch></v-list-tile-action>
        </v-list-tile>
    </v-list>
    <v-layout justify-end align-center>
        <span v-if="updated" class="green--text">Настройки успешно сохранены</span>
        <span class="red--text" v-if="error" v-text="error.error_msg"></span>
        <v-btn @click="update()" :loading="pending" color="primary">Сохранить</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import primaryFields from './primaryFields'
import SettingsForm from '@/components/SettingsForm'
export default {
    data(){
        return {
            primaryFields,
            secondaryFields
        }
    },
    methods: mapActions('settings', ['load', 'update']),
    computed: mapState('settings', ['pending', 'error', 'form', 'updated']),
    created(){
        this.load()
    },
    components: {
        SettingsForm
    }

}
</script>

<style>

</style>
