const express = require('express')
const router = express.Router()

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
    res.status(500).json({ error: e.message })
  }
})





//------------------------------------------------------------
//! 2. Получение ОДНОГО КОНТАКТА по id
router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId)

    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: `User wiht id:'${contactId}' not found`
      })
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: contact
      }
    })

  } catch (e) {
    res.status(500).json({ error: e.message });
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
