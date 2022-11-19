const express = require('express')
const router = express.Router()
const createError = require('http-errors')

const contactsOperations = require("../../models/contacts")


//------------------------------------------------------------
//! 1. Получение списка ВСЕХ КОНТАКТОВ
router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: contacts
      }
    })

  } catch (e) {
    next(e)
    // res.status(500).json({ error: e.message })
  }
})


//------------------------------------------------------------
//! 2. Получение ОДНОГО КОНТАКТА по id
router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId)

    if (!contact) {
      //! 3 - вариант
      throw createError(404, `Contact wiht id:'${contactId}' not found`)
      //! 2 - вариант
      // const error = new Error(`Contact wiht id:'${contactId}' not found`)
      // error.status = 404
      // throw error
      //! 1 - вариант
      //   res.status(404).json({
      //   status: "error",
      //   code: 404,
      //   message: `Contact wiht id:'${contactId}' not found`
      // })
      // return

    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: contact
      }
    })

  } catch (e) {
    next(e)
    // res.status(500).json({ error: e.message })
  }
})














router.post('/', async (req, res, next) => {
  const contact = await contactsOperations.addContact()
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  const contact = await contactsOperations.removeContact()
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  const contact = await contactsOperations.updateContact()
  res.json({ message: 'template message' })
})


module.exports = router
