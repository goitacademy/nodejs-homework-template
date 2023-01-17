const express = require('express');
const contactsModel = require('../../models/contacts');
const { schemeCreateContact } = require('./contacts-validations-schemes');
const { validateBody } = require('../../middlewares/validation');

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await contactsModel.listContacts();
  res.json({status: "success ", code: 200, payload : {contacts}})
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await contactsModel.getContactById(req.params.contactId);

  if (!contact) {
    return res.status(404).json({ status: "error", code: 404, message: "Not found"})
  }

  res.json({ status: "success", code: 200, payload: {contact} })
})

router.post('/', validateBody(schemeCreateContact), async (req, res, next) => {
  const newContact = await contactsModel.addContact(req.body)
  res.status(201).json({ status: "success", code: 201, contact: newContact })
})

router.delete('/:contactId', async (req, res, next) => {
  const removedContact = await contactsModel.removeContact(req.params.contactId);
  console.log('removed contact', removedContact)

  if (!removedContact) {
    res.status(404).json({ status:"error", code:404, message: "Not found"})
  }
  res.json({ status: "success", code: 200, payload: removedContact})
})


router.put('/:contactId', validateBody(schemeCreateContact), async (req, res, next) => {
  const updatedContact = await contactsModel.updateContact(req.params.contactId, req.body);

  if (!updatedContact) {
    res.status(404).json({ status: "error", code:404, message: "Not found"})
  }
  res.json({ status: "success", code: 404, payload: updatedContact });
})

module.exports = router
