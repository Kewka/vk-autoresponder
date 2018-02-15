<template>
    <v-tooltip bottom>
        <v-bottom-sheet slot="activator" inset v-model="sheet">
            <v-btn @click.prevent="" :class="{'green--text': enabled}" icon flat slot="activator">
                <v-icon>question_answer</v-icon>           
            </v-btn>
            <v-list>
                <v-subheader>Автоответчик</v-subheader>
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <v-icon color="blue">info</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            Состояние: 
                            <span 
                                :class="{'green--text': enabled, 'red--text': !enabled}" 
                                v-text="enabled ? 'включен' : 'выключен'">
                            </span>
                            <span class="red--text" v-if="error" v-text="`(${error.error_msg})`"></span>
                        </v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon flat :loading="pending" @click="loadResponder()"><v-icon>refresh</v-icon></v-btn>
                    </v-list-tile-action>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile avatar @click="toggleResponder()" :disabled="pending">
                    <v-list-tile-avatar>
                        <v-icon :color="enabled ? 'red' : 'green'" v-text="enabled ? 'stop' : 'play_arrow'"></v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ enabled ? 'Выключить' : 'Включить' }} автоответчик</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-bottom-sheet>
        <span>Управление автоответчиком</span>
    </v-tooltip>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data(){
        return {
            sheet: false
        }
    },
    methods: mapActions('responders', ['loadResponder', 'toggleResponder']),
    computed: mapState('responders', ['pending', 'enabled', 'error'])
}
</script>

<style>

</style>
