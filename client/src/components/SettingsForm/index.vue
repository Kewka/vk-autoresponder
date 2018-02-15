<template>
  <div>
    <v-list class="transparent" two-line>
        <v-subheader>Основные</v-subheader>
        <v-list-tile avatar>
            <v-list-tile-avatar><v-icon>people</v-icon></v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>Активность в чатах</v-list-tile-title>
                <v-list-tile-sub-title>Отвечать на сообщения в беседах (не рекомендуется)</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action><v-switch></v-switch></v-list-tile-action>
        </v-list-tile>
        <v-list-tile to="blacklist" avatar>
            <v-list-tile-avatar><v-icon>block</v-icon></v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>Черный список</v-list-tile-title>
                <v-list-tile-sub-title>Список диалогов, которые будут игнорироваться</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action><v-icon>chevron_right</v-icon></v-list-tile-action>
        </v-list-tile>
        <v-subheader>Дополнительные</v-subheader>
        <v-list-tile avatar>
            <v-list-tile-avatar><v-icon>notifications</v-icon></v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>Уведомления</v-list-tile-title>
                <v-list-tile-sub-title>Получать уведомления при получении нового сообщения</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action><v-switch></v-switch></v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar>
            <v-list-tile-avatar><v-icon>computer</v-icon></v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>Вечный онлайн</v-list-tile-title>
                <v-list-tile-sub-title>Всегда отображать меня как активного пользователя</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action><v-switch></v-switch></v-list-tile-action>
        </v-list-tile>
    </v-list>
    <v-layout justify-end align-center>
        <span v-if="false" class="green--text">Настройки успешно сохранены</span>
        <span class="red--text" v-if="false" v-text="error.error_msg"></span>
        <v-btn color="primary">Сохранить</v-btn>
    </v-layout>
  </div>
</template>

<script>
export default {
    data(){
        return{
            dialogBlacklist: true
        }
    }

}
</script>

<style>

</style>
