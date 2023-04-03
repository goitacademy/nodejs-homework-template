const express = require('express')


const addShema = require('../../shemas');
const contacts = require('../../models/contacts')
const { HttpError } = require('../../helpers');

const router = express.Router()


router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
  }
  catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId)
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found!`);
    }
    res.json(result)
  }
  catch (error) {
    next(error)
  }

})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addShema.validate(req.body)

    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  }
  catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId)
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found!`);
    }
    res.json({
      message: "Contact deleted"
    })
  }
  catch (error) {
    next(error)
  }
})

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addShema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body)
    console.log(result);
    if (!result) {
      throw HttpError(404, `Contact with ${contactId} not found!`);
    }
    res.json(result)
  }
  catch (error) {
    next(error)
  }
})

module.exports = router
