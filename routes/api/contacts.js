const express = require('express');
const { v4: uuidv4 } = require('uuid')
const {listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts')
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({
    status: 'success',
    code: 200,
    data: await listContacts(),
  });
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
  const findContactById = await getContactById(contactId)
  if (findContactById) {
    res.json({
      status: 'success',
      code: 200,
      data: findContactById,
    });
  } if (!findContactById) {
    res.json({
      status: 'error',
      code: 404,
      message: "Not found"
    })
  }
  } catch (err) {
    console.log(err)
  }
})


router.post('/', async (req, res, next) => {
  const {name, email, phone} = req.body
  const newContact = {
    id: uuidv4(),
    name: name,
    email,
    phone
  }
 res.status(201).json({
    status: 'success',
    code: 201,
    data: newContact,
    
 });
  addContact(newContact)
  
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})


module.exports = router
