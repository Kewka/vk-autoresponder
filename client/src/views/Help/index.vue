<template>
  <v-container class="elevation-3">
      <v-list subheader class="transparent">
          <v-subheader>Часто задаваемые вопросы</v-subheader>
          <v-expansion-panel>
              <v-expansion-panel-content v-for="(item, i) in questions" :key="i">
                  <div slot="header">
                      <strong>Вопрос:</strong>
                      <span v-text="item.question"></span>
                  </div>
                  <v-divider></v-divider>
                  <v-card>
                      <v-card-text>
                          <strong>Ответ</strong>
                          <p class="ma-0" v-html="item.answer"></p>
                      </v-card-text>
                  </v-card>
              </v-expansion-panel-content>
          </v-expansion-panel>
          <v-subheader>Пожертвования</v-subheader>
          <p class="text-xs-center">
              Вы можете поддержать наш проект. Все полученные средства пойдут на улучшения проекта и оплату хостинга.
              <br />
              <strong>Реквизиты:</strong>
          </p>
          <v-layout justify-center align-center wrap>
              <v-btn href="https://qiwi.me/vk-autoresponder">
                  <img src="public/img/qiwi_icon.png" alt="" style="height: 32px">
                  <span>QIWI</span>
              </v-btn>
              <v-btn href="https://money.yandex.ru/to/410012093699383">
                  <img src="public/img/ym_icon.png" alt="" style="height: 32px">
                  <span>Yandex Money</span>
              </v-btn>
          </v-layout>
      </v-list>
  </v-container>
</template>

<script>
import questions from './questions'
export default {
    data(){
        return {
            questions
        }
    }
}
</script>

<style>

</style>
