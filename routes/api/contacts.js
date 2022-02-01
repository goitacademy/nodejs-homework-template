const express = require('express')
const CreateError = require("http-errors")
const Joi = require("joi")

const contactsOperations = require("../../models/contacts")

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
});

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.getAllContacts()
    res.json(contacts)
  } catch(error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  const {id} = req.params;
  try {
    const contact = await contactsOperations.getContactById(id)
      if(!contact) {
        throw new CreateError(404, "Not found");
      }
    res.json(contact)
  } catch(error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newContactData = req.body
    const {error} = joiSchema.validate(newContactData)
      if(error) {
        throw new CreateError(400, "missing required name field")
      }
    const newContact = await contactsOperations.addContact(newContactData)
    res.status(201).json(newContact)
  } catch(error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const contactToDelete = await contactsOperations.removeContactById(id)
      if(!contactToDelete) {
        throw new CreateError(404, "Not found");
      }
    res.json({message: "contact deleted"})
  } catch(error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  const update = req.body
  try {
    const {error} = joiSchema.validate(update)
      if(error) {
        throw new CreateError(400, "missing fields")
      }
    const {id} = req.params
    const contactToUpdate = await contactsOperations.updateContactById({id, ...update})
      if(!contactToUpdate) {
        throw new CreateError(404, "Not found");
      }
    res.json(contactToUpdate)
  } catch(error) {
    next(error)
  }
})

module.exports = router