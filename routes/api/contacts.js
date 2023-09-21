const express = require('express')
const router = express.Router()
const contactsModel = require('../../models/contacts')
const { bodySchema } = require('../../shemas/valid-contact')

/**
 * @ GET /api/contacts
 * нічого не отримує 
 * викликає функцію listContacts для роботи з json-файлом contacts.json 
 * повертає масив всіх контактів в json-форматі зі статусом 200
 */
router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsModel.listContacts()
    return res.json({
      status: "success",
      code: 200,
      data: { contacts },
    })
  } catch (err) {
    next(err)
  }
})

/**
 * @ GET /api/contacts/:id
 * Не отримує body
 * Отримує параметр id
 * викликає функцію getById для роботи з json-файлом contacts.json
 * якщо такий id є, повертає об'єкт контакту в json-форматі зі статусом 200
 * якщо такого id немає, повертає json з ключем "message": "Not found" і статусом 404
 */
router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId

  try {
    const contact = await contactsModel.getContactById(contactId)
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: { contact },
      })
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      })
    }
  } catch (err) {
    next(err)
  }
})

/**
 * @ POST /api/contacts
 * Отримує body в форматі {name, email, phone}
 * Якщо в body немає якихось полів, повертає json з ключем {"message": "missing required name field"} і статусом 400
 * Якщо з body все добре, додає унікальний ідентифікатор в об'єкт контакту
 * Викликає функцію addContact(body) для збереження контакту в файлі contacts.json
 * За результатом роботи функції повертає об'єкт з доданим id {id, name, email, phone} і статусом 201
 */
router.post('/', async (req, res, next) => {
  try {
    const validContact = bodySchema.validate(req.body)
    const body = req.body

    if (validContact.error) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: validContact.error.details[0].message,
      })
    }

    const contacts = await contactsModel.addContact(req.body)
    if (contacts) {
      return res.status(201).json({
        status: "success",
        code: 201,
        data: { contacts }
      })
    } else {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required name field",
      })
    }
  } catch (err) {
    next(err)
  }
})

/**
 * @ DELETE /api/contacts/:id
 * Не отримує body
 * Отримує параметр id
 * Викликає функцію removeContact для роботи з json-файлом contacts.json
 * якщо такий id є, повертає json формату {"message": "contact deleted"} і статусом 200
 * якщо такого id немає, повертає json з ключем "message": "Not found" і статусом 404
 */
router.delete('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId
    const contact = await contactsModel.removeContact(contactId)

    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: { message: "contact deleted" }
      })
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found"
      })
    }
  } catch (err) {
    next(err)
  }
})

/**
 * @ PUT /api/contacts/:id
 * Отримує параметр id
 * Отримує body в json-форматі c оновленням будь-яких полів name, email и phone
 * Якщо body немає, повертає json з ключем {"message": "missing fields"} і статусом 400
 * Якщо з body всі добре, викликає функцію updateContact(contactId, body)
 * За результатом роботи функції повертає оновлений об'єкт контакту і статусом 200. 
 * В іншому випадку, повертає json з ключем "message": "Not found" і статусом 404
 */
router.put('/:contactId', async (req, res, next) => {
  const validContact = bodySchema.validate(req.body)
  if (validContact.error) {
    return res.status(400).json({
      status: validContact.error.details
    })
  }
  const contactId = req.params.contactId
  const body = req.body

  try {
    const updateContact = await contactsModel.updateContact(contactId, body)

    if (updateContact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: updateContact,
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found'
      })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
