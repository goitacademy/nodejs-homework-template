**Читать на других языках: [Русский](README.md), [Українська](README.ua.md).**

# Домашнее задание 2

Создай форк [репозитория](https://github.com/goitacademy/nodejs-homework-template) в свой github аккаунт.

Посмотри поясняющее видео как это сделать и сдавать ДЗ правильно: [<img src="./js.png" width="640">](https://www.youtube.com/watch?v=wabSW_sz_cM 'Пояснение')

Написать REST API для работы с коллекцией контактов. Для работы с REST API используй [Postman](https://www.getpostman.com/).

Прочитай внимательно readme в клонированном бойлерплейте, там описан механизм сдачи домашних заданий. Приступай к выполнению ДЗ

## Шаг 1

Создай ветку `hw02-express` из ветки master.

Установи модули командой:

```bash
npm i
```

Следующие модули уже есть в проекте:

- [express](https://www.npmjs.com/package/express)
- [morgan](https://www.npmjs.com/package/morgan)
- [cors](https://www.npmjs.com/package/cors)

## Шаг 2

В app.js – веб сервер на express, добавлены прослойки `morgan` и `cors`. Начни настраивать раутинг для работы с коллекцией контактов.

REST API должен поддерживать следующие рауты.

### @ GET /api/contacts

- ничего не получает
- вызывает функцию `listContacts` для работы с json-файлом `contacts.json`
- возвращает массив всех контактов в json-формате со статусом `200`

### @ GET /api/contacts/:contactId

- Не получает `body`
- Получает параметр `contactId`
- вызывает функцию getById для работы с json-файлом contacts.json
- если такой id есть, возвращает обьект контакта в json-формате со статусом `200`
- если такого id нет, возвращает json с ключом `"message": "Not found"` и статусом `404`

### @ POST /api/contacts

- Получает `body` в формате `{name, email, phone}`
- Если в body нет каких-то обязательных полей, возвращает json с ключом `{"message": "missing required name field"}` и статусом `400`
- Если с `body` все хорошо, добавляет уникальный идентификатор в объект контакта
- Вызывает функцию `addContact(body)` для сохранения контакта в файле `contacts.json`
- По результату работы функции возвращает объект с добавленным `id` `{id, name, email, phone}` и статусом `201`

### @ DELETE /api/contacts/:contactId

- Не получает `body`
- Получает параметр `contactId`
- вызывает функцию `removeContact` для работы с json-файлом `contacts.json`
- если такой `id` есть, возвращает json формата `{"message": "contact deleted"}` и статусом `200`
- если такого `id` нет, возвращает json с ключом `"message": "Not found"` и статусом `404`

### @ PUT /api/contacts/:contactId

- Получает параметр `contactId`
- Получает `body` в json-формате c обновлением любых полей `name, email и phone`
- Если `body` нет, возвращает json с ключом `{"message": "missing fields"}` и статусом `400`
- Если с `body` все хорошо, вызывает функцию `updateContact(contactId, body)` (напиши ее) для обновления контакта в файле `contacts.json`
- По результату работы функции возвращает обновленный объект контакта и статусом `200`. В противном случае, возвращает json с ключом `"message": "Not found"` и статусом `404`

## Шаг 3

Для маршрутов, что принимают данные (`POST`, `PUT`, `PATCH`), продумайте проверку (валидацию) принимаемых данных. Для валидации принимаемых данных можно использовать один из пакетов – валидаторов данных, а не писать проверки самостоятельно:

1. [joi](https://github.com/sideway/joi)
2. [express-validator](https://github.com/express-validator/express-validator)
3. [yup](https://github.com/jquense/yup)

<img src="validator.png" width="640">

## Критерии приема дз #2-6

- Создан репозиторий с домашним заданием &mdash; REST API приложение
- При создании репозитория использован [бойлерплейт](https://github.com/goitacademy/nodejs-homework-template)
- Пулл-реквест (PR) с соответствующим дз отправлен ментору в [schoology](https://app.schoology.com/login) на проверку (ссылка на PR)
- Код соответствует техническому заданию проекта
- При выполнении кода не возникает необработанных ошибок
- Название переменных, свойств и методов начинается со строчной буквы и записываются в нотации CamelCase. Используются английские существительные
- Название функции или метода содержит глагол
- В коде нет закомментированных участков кода
- Проект корректно работает в актуальной LTS-версии Node
