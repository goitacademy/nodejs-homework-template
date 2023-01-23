# nodejs-homework

### @ GET /api/contacts

- ничего не получает
- вызывает функцию `listContacts` для работы с json-файлом contacts.json
- возвращает массив всех контактов в json-формате со статусом 200

### @ GET /api/contacts/:id

- Не получает body
- Получает параметр `id`
- вызывает функцию getById для работы с json-файлом contacts.json
- если такой id есть, возвращает обьект контакта в json-формате со статусом 200
- если такого id нет, возвращает json с ключом `"message": "Not found"` и
  статусом 404

### @ POST /api/contacts

- Получает body в формате `{name, email, phone}`
- Если в body нет каких-то обязательных полей, возарщает json с ключом
  `{"message": "missing required name field"}` и статусом 400
- Если с body все хорошо, добавляет уникальный идентификатор в обьект контакта
- Вызывает функцию `addContact()` для сохранения контакта в файле contacts.json
- По результату работы функции возвращает обьект с добавленным id
  `{id, name, email, phone}` и статусом 201

### @ DELETE /api/contacts/:id

- Не получает body
- Получает параметр `id`
- вызывает функцию `removeContact` для работы с json-файлом contacts.json
- если такой id есть, возвращает json формата `{"message": "contact deleted"}` и
  статусом 200
- если такого id нет, возвращает json с ключом `"message": "Not found"` и
  статусом 404

### @ PATCH /api/contacts/:id

- Получает body в json-формате c обновлением любых полей `name, email и phone`
- Если body нет, возарщает json с ключом `{"message": "missing fields"}` и
  статусом 400
- Если с body все хорошо, вызывает функцию `updateContact(id)` (напиши ее) для
  обновления контакта в файле contacts.json
- По результату работы функции возвращает обновленный обьект контакта и
  статусом 200. В противном случае, возвращает json с ключом
  `"message": "Not found"` и статусом 404
