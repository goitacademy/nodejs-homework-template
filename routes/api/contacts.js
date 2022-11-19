const express = require('express')
const router = express.Router()

const contactsOperations = require("../../models/contacts")


//------------------------------------------------------------
//? 1. Получение списка ВСЕХ ПОЛЬЗОВАТЕЛЕЙ
router.get('/', async (req, res, next) => {
  const contacts = await contactsOperations.listContacts()

  // res.json({ message: 'template message' })
  // res.json(contacts)

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: contacts
    }
  })
})

//! 1. Получение списка ВСЕХ ПОЛЬЗОВАТЕЛЕЙ
router.get("/", async (req, res, next) => {
  try {
    console.log("START-->GET/All".green); //!
    const users = await getUsersList();
    console.log("END-->GET/All".green); //!

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: users
      }
    });

  } catch (e) {
    res.status(500).json({ error: e.message })
  }
});





//------------------------------------------------------------
//? 2. Получение ОДНОГО ПОЛЬЗОВАТЕЛЯ по id
router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.getContactById(contactId)

  // res.json({ message: 'template message' })
  // res.json(contact)

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: contact
    }
  })
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
