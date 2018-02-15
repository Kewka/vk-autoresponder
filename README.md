# VK Autoresponder
<p align="center">
  Автоответчик для социальной сети <a href="https://vk.com">ВКонтакте</a>.<br>
  Каждый ответ на сообщение сохраняется в истории.<br>
  Также реализована функция вечного онлайна.
</p>
<hr>
<div align="center">

**Frontend**: [Vue.js](https://github.com/vuejs/vue) + [Vuetify](https://github.com/vuetifyjs/vuetify)  
**Backend**: [Node.js](https://github.com/nodejs) + [Express](https://github.com/expressjs/express) + [MySQL](https://www.mysql.com)  

</div>

## Установка
```
  # ~/client:
    npm install
    npm run build
  # Скопировать index.html, папку dist и public в папку server.
  # Импортировать файл db.sql в свою базу данных MySQL.
  # Настроить конфиг для подключения к базе данных (server/src/db/config.js)
  # Настроить конфиг приложения ВК для OAuth авторизации (server/src/vk/appConfig.json)
  # ~/server:
    npm install
    npm start # для production
    npm run dev # для development
```

## Скриншоты
<img src="https://i.imgur.com/pU1fJ2Q.jpg" />
<img src="https://i.imgur.com/7fcrDVs.jpg" />
