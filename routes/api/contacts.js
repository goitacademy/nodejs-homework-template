const express = require('express')
const router = express.Router()
// const { addContact, getContactById, listContacts, removeContact } = require('../../controllers/contacts')
const { listContacts, getContactById } = require('../../model')

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()

  // ничего не получает
  // вызывает функцию listContacts для работы с json-файлом contacts.json
  // возвращает массив всех контактов в json-формате со статусом 200
  // res.sendStatus(200)
  res.json({
    status: 'Success',
    code: 200,
    data: { result: contacts },
  })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const contact = await getContactById(contactId)
  console.log(contactId)
  res.json({
    status: 'Success',
    code: 200,
    data: { result: contact },
  })
  // Не получает body
  // Получает параметр contactId
  // вызывает функцию getById для работы с json-файлом contacts.json
  // если такой id есть, возвращает объект контакта в json-формате со статусом 200
  // если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404

  // res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  // Получает body в формате {name, email, phone}
  // Если в body нет каких-то обязательных полей, возвращает json с ключом {"message": "missing required name field"} и статусом 400
  // Если с body все хорошо, добавляет уникальный идентификатор в объект контакта
  // Вызывает функцию addContact(body) для сохранения контакта в файле contacts.json
  // По результату работы функции возвращает объект с добавленным id {id, name, email, phone} и статусом 201

  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  // Не получает body
  // Получает параметр contactId
  // вызывает функцию removeContact для работы с json-файлом contacts.json
  // если такой id есть, возвращает json формата {"message": "contact deleted"} и статусом 200
  // если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404

  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  // Получает параметр contactId
  // Получает body в json-формате c обновлением любых полей name, email и phone
  // Если body нет, возвращает json с ключом {"message": "missing fields"} и статусом 400
  // Если с body все хорошо, вызывает функцию updateContact(contactId, body) (напиши ее) для обновления контакта в файле contacts.json
  // По результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404

  res.json({ message: 'template message' })
})

module.exports = router
