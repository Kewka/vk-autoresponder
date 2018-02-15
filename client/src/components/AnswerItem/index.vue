<template>
  <v-list-tile>
        <v-list-tile-content class="select-text">
            <v-list-tile-title v-text="item.pattern"></v-list-tile-title>
            <v-list-tile-sub-title>Ответ: {{ item.answer }}</v-list-tile-sub-title>
            <v-list-tile-sub-title>Отвечать в режиме онлайн: {{ item.in_online ? 'Да' : 'Нет' }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
            <v-btn @click="$emit('remove', item.id)" color="red" flat icon>
                <v-icon>delete</v-icon>
            </v-btn>
        </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
    props: {
        item: Object
    }
}
</script>

<style>

</style>
