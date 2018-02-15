<template>
  <v-list-tile :href="item.href" target="_blank" avatar>
        <v-list-tile-avatar>
            <v-icon v-if="!item.photo_max">mail</v-icon>
            <v-avatar v-else>
                <img :src="item.photo_max" alt="">
            </v-avatar>
        </v-list-tile-avatar>
        <v-list-tile-content class="select-text">
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
            <v-list-tile-sub-title>Сообщение: {{ item.body }}</v-list-tile-sub-title>
            <v-list-tile-sub-title>Ответ: {{ item.answer }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action v-text="moment.unix(item.time).format('HH:mm / DD.MM.YY')"></v-list-tile-action>
  </v-list-tile>
</template>

<script>
import moment from 'moment'
export default {
    data(){
        return {
            moment
        }
    },
    props: {
        item: Object
    }
}
</script>

<style>

</style>
