const express = require('express')
const contacts = require('../../models/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
  const listContacts = await contacts.listContacts();
  res.json({
    message: 'success',
    code: 200,
    data: listContacts,
  })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await contacts.getContactById(contactId);
  if (contactById)
    res.json({
      message: "Contact is found",
      code: 200,
      data: contactById,
    }); else res.json({
      message: "Not found",
      code: 404,
    });
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const addedContact = await contacts.addContact({name, email, phone});
  res.json({
    message: "Contact added successfully",
    code: 201,
    data: addedContact,
  });
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
