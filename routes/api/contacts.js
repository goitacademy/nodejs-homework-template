const express = require('express');
const {HttpError, validationSchema} = require("../../helpers/index")
const {listContacts, getContactById, addContact, removeContact, updateContact} = require("../../models/contacts")
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200).json({ data });
  } catch (err) {
    HttpError(404, "Not found")
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const data = await getContactById(contactId);
    if (data === undefined) {
      return next(HttpError(404, "Not found"));
    }
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, "missing fields"));
    }
    const data = await addContact(req.body);
    res.status(201).json({ data });
  } catch (err) {
    next(err);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
   const {contactId} = req.params;
    const data = await getContactById(contactId);
    console.log("data", data);
    if (data === undefined) {
      return next(HttpError(404, "Not found"));
    }
    await removeContact(contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    next(err);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, "missing fields"));
    }

    const contactId = req.params.contactId;

    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
      HttpError(404, "Not found")
    }
    res.status(200).json({ updatedContact });
  } catch (err) {
    
  }
})

module.exports = router
