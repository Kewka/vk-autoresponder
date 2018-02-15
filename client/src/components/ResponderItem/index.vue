<template>
  <v-list-tile :href="`https://vk.com/id${item.uid}`" avatar>
    <v-list-tile-avatar>
        <img :src="item.photo_max" />
    </v-list-tile-avatar>
    <v-list-tile-content>
        <v-list-tile-title>{{ item.first_name }} {{ item.last_name }}</v-list-tile-title>
    </v-list-tile-content>
    <v-list-tile-action>
        <v-icon>chevron_right</v-icon>
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
