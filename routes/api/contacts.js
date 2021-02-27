const express = require('express')
const router = express.Router()
const Contacts = require('../../model/index.js')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: {
          contact
        }
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        data: {
          message: 'Not found'
        }

      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.body.name && req.body.email && req.body.phone) {
      const contact = await Contacts.addContact(req.body)
      res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          contact
        }
      })
    } else {
      res.status(400).json({
        status: 'error',
        code: 400,
        data: {
          message: 'missing required name field'
        }
      })
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const deletedContact = await Contacts.removeContact(req.params.contactId)

    if (deletedContact) {
      res.json({
        status: 'success',
        code: 200,
        data: {
          message: 'Contact deleted',
        }
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        data: {
          message: 'Not found'
        }

      })
    }
  } catch (error) {
    next(error)
  }
})

// Получает параметр contactId
// Получает body в json-формате c обновлением любых полей name, email и phone
// Если body нет, возарщает json с ключом {"message": "missing fields"} и статусом 400
// Если с body все хорошо, вызывает функцию updateContact(contactId, body) (напиши ее) для обновления контакта в файле contacts.json
// По результату работы функции возвращает обновленный обьект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404

router.patch('/:contactId', async (req, res, next) => {
  if (Object.keys(req.body).length !== 0) {
    try {
      const contact = await Contacts.updateContact(req.params.contactId, req.body)
      if (contact) {
        res.json({
          status: 'success',
          code: 200,
          data: {
            contact
          }
        })
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          data: {
            message: 'Not found'
          }
        })
      }
    } catch (error) {
      next(error)
    }
  } else {
    res.status(400).json({
      status: 'error',
      code: 400,
      data: {
        message: 'missing fields'
      }
    })
  }
})

module.exports = router
