# Clothing Store

Этот проект представляет собой веб-приложение для магазином одежды.

## Технологии

- [Node js](https://nodejs.org/en)
- [express js](https://expressjs.com/ru/)
- [handlebars](https://handlebarsjs.com/)
- [MySQL](https://www.mysql.com/)

## Инструкции по запуску проекта

- Убедитесь, что у вас установлен Node.js и npm.
- Склонируйте репозиторий на локальную машину.
- Установите зависимости, выполнив команду:

```sh
$ npm install
```

- Создайте базу данных с названием **clothing_store**.
- Импортируйте содержимое базы данных из файла **./database/clothing_store.sql**.
- В корневой директории проекта настройке файл .env и укажите в нем параметры подключения к вашей базе данных. Пример:

```sh
PORT=3000
SECRET_KEY=Askjdhgv

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=clothing_store
```

- Запустите приложение, выполните команду:

```sh
$ npm run start
```

- Откройте браузер и перейдите по адресу http://localhost:3000 для доступа к приложению.
