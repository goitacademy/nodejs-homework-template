const express = require('express')
const router = express.Router()
// const { addContact, getContactById, listContacts, removeContact } = require('../../controllers/contacts')
const { listContacts, getContactById, addContact } = require('../../model')

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
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
})

router.post('/', async (req, res, next) => {
  console.log('this is post')
  const { name, email, phone } = req.body
  let message = ''

  if (!name) message = "missing required 'name' data"
  if (!email) message = "missing required 'email' data"
  if (!phone) message = "missing required 'phone' data"
  if (message) {
    res.status(400).send({ error: message })
    return
  }
  const newContact = await addContact(name, email, phone)
  // Если с body все хорошо, добавляет уникальный идентификатор в объект контакта
  // Вызывает функцию addContact(body) для сохранения контакта в файле contacts.json
  // По результату работы функции возвращает объект с добавленным id {id, name, email, phone} и статусом 201

  res.json({
    status: 'Created',
    code: 201,
    data: { result: newContact },
  })
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
