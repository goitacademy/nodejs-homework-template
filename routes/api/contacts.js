const express = require('express');

const {contactValidation, putContactValidation} = require("../../schemas/validation.js")

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const { HttpError } = require("../../helpers");

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
     res.json(await listContacts())
  } catch (error) {
    next(error)
  }

})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
  const getContId = await getContactById(contactId);
    if (!getContId) {
      throw HttpError(404, "Not found 🛑 ");

  }
  res.json(getContId)
  } catch (error) {
    next(error)
  }
  
})

router.post('/', contactValidation, async (req, res, next) => {
  try {
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found 🛑 ");
    }
    res.json({message: "Delete success 🦴"});
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', putContactValidation, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found 🛑 ");

  }
    res.status(202).json(result);

  } catch (error) {
    next(error)
  }
})

module.exports = router


