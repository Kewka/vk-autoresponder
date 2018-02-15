<template>
  <v-container class="elevation-3">
      <p class="pa-2" v-if="error" v-text="error.error_msg"></p>
      <updating-list
            header="Автоответчики в сети" 
            empty="В данный момент нет активных автоответчиков" 
            @update="loadActive()" 
            :items="items"
            :pending="pending"
            divider
      >
        <responder-item slot-scope="props" :item="props.item"></responder-item>
      </updating-list>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ResponderItem from '@/components/ResponderItem'
import UpdatingList from '@/components/UpdatingList'

export default {
    methods: mapActions('responders', ['loadActive']),
    computed: {
        ...mapState({ items: state => state.responders.activeResponders }),
        ...mapState('responders', ['pending', 'error'])
    },
    created(){
        this.loadActive()
    },
    components: {
        ResponderItem,
        UpdatingList
    }
}
</script>
