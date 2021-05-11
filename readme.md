# Работа с контактами

## Роуты

### Контакты

- http://localhost:3000/api/contacts - get - показать все контакты
- http://localhost:3000/api/contacts - post - добавить контакт (поля name, email, phone - обязательны, favorite - опционально)
- http://localhost:3000/api/contacts/id - get - получить контакт по ID
- http://localhost:3000/api/contacts/id - put - обновить контакт (хотя бы одно поле должно быть обновлено)
- http://localhost:3000/api/contacts/id - delete - удалить контакт
- http://localhost:3000/api/contacts/id/favorite - patch - обновить поле 'favorite'

### Пользователи

- http://localhost:3000/api/users/signup - post - регистрация
- http://localhost:3000/api/users/login - post - залогинится
- http://localhost:3000/api/users/logout - post - разлогинится
- http://localhost:3000/api/users/current - get - получить данные юзера по токену
- http://localhost:3000/api/users - patch - обновить подписку

- http://localhost:3000/api/users/starter - get - доступ по подписке starter
- http://localhost:3000/api/users/pro - get - доступ по подписке pro
- http://localhost:3000/api/users/business - get - доступ по подписке business

(есть валидация)

http://localhost:3000/api/users/avatars - patch - обновить аватар

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок

#### работа с Mongoose, Joi, passport, jsonwebtoken, multer, gravatar, jimp
