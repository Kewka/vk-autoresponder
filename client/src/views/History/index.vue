<template>
  <v-container class="elevation-3">
      <v-tooltip left>
            <v-btn @click="clear()" :loading="pending" fab fixed right bottom dark color="pink" slot="activator">
                <v-icon>delete</v-icon>
            </v-btn>
            <span>Очистить историю</span>
      </v-tooltip>
      <p class="text-xs-center red--text" v-if="error" v-text="error.error_msg"></p>
      <updating-list 
        header="История ответов" 
        empty="История ответов пуста" 
        @update="load()" 
        :items="items"
        :pending="pending" 
        :line-count="3"
        divider
      >
        <history-item slot-scope="props" :item="props.item" :key="props.item.id"></history-item>
      </updating-list>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HistoryItem from '@/components/HistoryItem'
import UpdatingList from '@/components/UpdatingList'

export default {
    methods: mapActions('history', ['load', 'clear']),
    computed: mapState('history', ['pending', 'items', 'error']),
    created(){
        this.load()
    },
    components: {
        HistoryItem,
        UpdatingList
    }
}
</script>
