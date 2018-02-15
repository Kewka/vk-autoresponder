<template>
    <v-list class="transparent">
        <template v-for="(item, i) in listCounters" v-if="counters[item.name]">
            <v-list-tile :key="i">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    {{ counters[item.name] }} {{ counters['online_' + item.name] ? `(${counters['online_' + item.name]})` : null }}
                </v-list-tile-action>
            </v-list-tile>
        </template>
    </v-list>
</template>

<script>
import listCounters from './counters';
export default {
    data(){
        return {
            listCounters
        }
    },
    props: {
        counters: {
            type: Object,
            default: {}
        }
    }
}
</script>

<style>

</style>
