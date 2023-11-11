const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')

const app = express()

require('./models/contacts')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app


/* Крок 2

У app.js - веб сервер на express і прошарки morgan і cors. Почни налаштовувати раутінг для роботи з колекцією контактів.

REST API повинен підтримувати такі раути.

@ GET /api/contacts

нічого не отримує
викликає функцію listContacts для роботи з json-файлом contacts.json
повертає масив всіх контактів в json-форматі зі статусом 200
@ GET /api/contacts/:id

Не отримує body
Отримує параметр id
викликає функцію getById для роботи з json-файлом contacts.json
якщо такий id є, повертає об'єкт контакту в json-форматі зі статусом 200
якщо такого id немає, повертає json з ключем "message": "Not found" і статусом 404
@ POST /api/contacts

Отримує body в форматі {name, email, phone} (усі поля обов'язкові)
Якщо в body немає якихось обов'язкових полів, повертає json з ключем {"message": "missing required name field"} і статусом 400
Якщо з body все добре, додає унікальний ідентифікатор в об'єкт контакту
Викликає функцію addContact(body) для збереження контакту в файлі contacts.json
За результатом роботи функції повертає об'єкт з доданим id {id, name, email, phone} і статусом 201
@ DELETE /api/contacts/:id

Не отримує body
Отримує параметр id
Викликає функцію removeContact для роботи з json-файлом contacts.json
якщо такий id є, повертає json формату {"message": "contact deleted"} і статусом 200
якщо такого id немає, повертає json з ключем "message": "Not found" і статусом 404
@ PUT /api/contacts/:id

Отримує параметр id
Отримує body в json-форматі c оновленням будь-яких полів name, email и phone
Якщо body немає, повертає json з ключем {"message": "missing fields"} і статусом 400
Якщо з body всі добре, викликає функцію updateContact(contactId, body). (Напиши її) для поновлення контакту в файлі contacts.json
За результатом роботи функції повертає оновлений об'єкт контакту і статусом 200. В іншому випадку, повертає json з ключем "message": "Not found" і статусом 404
 */