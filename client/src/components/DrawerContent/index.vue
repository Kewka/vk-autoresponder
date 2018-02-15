<template>
      <v-flex>
        <v-list v-if="user" class="pa-0" two-line>
            <v-list-tile to="account" avatar>
                <v-list-tile-avatar>
                <img :src="user.photo_max" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                <v-list-tile-title>{{ user.first_name }} {{ user.last_name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ user.status }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <responder></responder>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
        <v-layout v-if="pending && !user" justify-center>
            <v-progress-circular color="primary" class="ma-2" indeterminate size="24"></v-progress-circular>
        </v-layout>
        <p class="red--text text-xs-center ma-2" v-if="error" v-text="error.error_msg"></p>
        <v-divider></v-divider>
        <v-list class="pt-0">
            <v-list-tile
            v-for="(item, i) in items"
            :to="item.link"
            :key="i"
            >
            <v-list-tile-action>
                <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
        </v-list>
      </v-flex>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Responder from './Responder'
import items from './items'
export default {
    data(){
        return {
            sheet: false,
            items
        }
    },
    computed: mapState('account', ['user', 'pending', 'error']),
    components: {
        Responder
    }


}
</script>

<style>

</style>
