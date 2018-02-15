<template>
  <v-container class="elevation-3">
      <v-tabs grow icons>
        <v-tabs-bar>
          <v-tabs-item v-for="(item, i) in tabs" :key="i" :href="`#${item.key}`">
            <v-icon v-text="item.icon"></v-icon>
            <span v-text="item.title"></span>
          </v-tabs-item>
          <v-tabs-slider color="primary"></v-tabs-slider>
        </v-tabs-bar>
        <v-divider></v-divider>
        <v-tabs-items>
          <v-tabs-content
            v-for="(item, i) in tabs"
            :key="i"
            :id="item.key"
          >
            <component :is="item.component"></component>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
  </v-container>
</template>

<script>
import AuthDirect from '@/components/AuthDirect'
import AuthCode from '@/components/AuthCode'
export default {
  data(){
    return {
      tabs: [
        {  key: 'direct', title: 'Прямая авторизация', component: AuthDirect, icon: 'keyboard' },
        {  key: 'code', title: 'Вход с помощью code', component: AuthCode, icon: 'vpn_key' },               
      ]
    }
  }
}
</script>

<style>

</style>
