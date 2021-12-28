const express = require('express')
const router = express.Router();
const Joi = require('joi');
const contactsOperations = require('../../models/contacts/index')

const schemaAdd = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().regex(/[\s(]*\d{3}[)\s]* \d{3}-\d{4}$/).required()
})

const schemaUpdate = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string()
}).min(1)


router.get('/', async (req, res, next) => {
  res.status(200).json(await contactsOperations.listContacts())
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsOperations.getById(id);
  contact
    ? res.status(200).json(contact)
    : res.status(404).json({ message: `Contact with ID: ${id} not found!` })
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = { name, email, phone }
  try { await schemaAdd.validateAsync(newContact)
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "missing required name field" })
    }
    const newBody = await contactsOperations.addContact(newContact)
      res.status(201).json(newBody)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await contactsOperations.getById(id);
    contact
      ? res.status(200).json(await contactsOperations.removeContact(id))
      : res.status(404).json({message: "Not found"})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const contact = await contactsOperations.getById(id);
  if (!contact) {
      return res.status(404).json({
          message: "Not found",
      })
  }
  const editedContact = {
  id,
  name: name || contact.name,
  email: email || contact.email,
  phone: phone || contact.phone
  }
  
  try {schemaUpdate.validateAsync(editedContact)
    if (name || email || phone) {
      const updatedContact = await contactsOperations.updateContact(id, editedContact)
      res.status(200).json({
          message: `Contact with ID: ${ id } successfully updated!`,
          data: updatedContact
        })
      
    }
    else {
      res.status(400).json({ message: "missing fields" })
    }
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router
