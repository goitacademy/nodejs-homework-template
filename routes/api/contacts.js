const express = require('express')
const Joi = require('joi')
const { listContacts, getContactById, addContact, updateContact, removeContact } = require('../../models/contacts')
const { HttpError } = require('../../helpers')

const router = express.Router()

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()

})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json(contacts)

  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await getContactById(contactId)
    if (!contact) {
      throw HttpError(404, "Not found")
    }
    res.json(contact)

  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }

    const result = await addContact(req.body)
    res.status(201).json(result)

  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json({
      message: "Contact deleted"
    })
  } catch (error) {
    next(error)
  }


})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(400, "Not found");
    }
    res.json(result)

  } catch (error) {
    next(error)
  }
})

module.exports = router
