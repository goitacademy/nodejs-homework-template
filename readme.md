## GoIT Node.js Course Template Homework

## Routes:

### Contacts

- http://localhost:3000/api/contacts - get - показать все контакты
- http://localhost:3000/api/contacts - post - добавить контакт (поле "Favorite"необязательно)
- http://localhost:3000/api/contacts/id - get - получить контакт по ID
- http://localhost:3000/api/contacts/id - put - обновить контакт (одно или несколько полей)
- http://localhost:3000/api/contacts/id - delete - удалить контакт
- http://localhost:3000/api/contacts/id/favorite - patch - обновить поле 'favorite'

### Users

- http://localhost:3000/api/users/signup - post - регистрация
- http://localhost:3000/api/users/login - post - залогинится
- http://localhost:3000/api/users/logout - post - разлогинится
- http://localhost:3000/api/users/current - get - получить данные юзера по токену
- http://localhost:3000/api/users - patch - обновить подписку

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок
