yarn start:dev
Запускает сервер в режиме development nodemon.
При успешном запуске и подключениии к базе данных MongoDB, в терминале будет Database connection successful

yarn start - запуск в режиме production.

Методы для авторизации пользователя:
Метод | Путь | Описание
POST |/api/contacts/register | Регистрация нового пользователя.
POST |/api/contacts/login | Логинизация пользователя.
GET |/api/contacts/logout | Разлогинивание пользователя .

Методы работы с контактами:
Contacts
Метод | Путь | Описание
GET |/api/contacts | Получить все контакты.
GET |/api/contacts/:contactId | Получить контакт по id.
POST |/api/contacts |Создать новый контакт.
DELETE |/api/contacts/:contactId |Удалить контакт.
PUT |/api/contacts/:contactId |Обновить существующий контакт по id.
PATCH |/api/contacts/:contactId/favorite |Обновить поле favorite существующего контакта по id.
