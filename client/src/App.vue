<template>
  <v-app :dark="dark">
    <v-navigation-drawer
      v-if="isLoggedIn"
      hide-overlay
      fixed
      v-model="drawer"
      :clipped="$vuetify.breakpoint.width > 1264"
      app
    >
      <drawer-content></drawer-content>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="$vuetify.breakpoint.width > 1264">
      <v-toolbar-side-icon v-if="isLoggedIn" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="toolbarTitle"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <v-btn slot="activator" @click="toggleDark()" icon>
          <v-icon>invert_colors</v-icon>
        </v-btn>
        <span>Переключение темы</span>
      </v-tooltip>
      <v-menu bottom left>
        <v-btn icon slot="activator"><v-icon>more_vert</v-icon></v-btn>
        <v-list>
          <v-list-tile
            v-for="(item, i) in menuItems"
            :key="i"
            exact
            :to="item.link"
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn v-if="!isLoggedIn" to="login" flat color="primary">Вход</v-btn>
    </v-toolbar>
    <v-progress-linear v-show="routeLoading" indeterminate style="position: absolute; top: 0; z-index: 5" class="ma-0 pa-0" height="4"></v-progress-linear>
    <v-content>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
    </v-content>
    <v-footer class="pa-1">
        <v-layout justify-center>
          <span>&copy; 2017 <a href="https://github.com/Kewka">Kewka</a></span>
        </v-layout>
    </v-footer>
  </v-app>
  
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DrawerContent from '@/components/DrawerContent'

  export default {
    data () {
      return {
        drawer: null,
        authDialog: null,
        items: [
          { icon: 'edit', title: 'Ответы', link: 'answers' },
          { icon: 'history', title: 'История', link: 'history' },       
          { icon: 'settings', title: 'Настройки', link: 'settings' },
          { icon: 'exit_to_app', title: 'Выйти из учетной записи', link: 'logout' },
        ],
        menuItems: [
          { icon: 'home', title: 'Главная', link: '/' },          
          { icon: 'question_answer', title: 'Автоответчики в сети', link: 'responders' },
          { icon: 'help', title: 'Справка', link: 'help' },   
          { icon: 'fa-vk', title: 'ВКонтакте', link: 'redirect?url=https://vk.com' }
        ]
      }
    },
    methods: {
      ...mapActions(['toggleDark']),      
      ...mapActions('account', ['loadAccount']),
      ...mapActions('responders', ['loadResponder']),      
    },
    computed: {
      toolbarTitle(){
        return this.$route.meta.title || 'VK Автоответчик'
      },
      ...mapState('auth', ['isLoggedIn']),
      ...mapState(['routeLoading', 'dark'])
    },
    created(){
      if (this.isLoggedIn){
        this.loadAccount()
        this.loadResponder()
      }
    },
    components: {
      DrawerContent
    }
  }
</script>

<style>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
.select-text{
        user-select: text!important;
}
</style>

