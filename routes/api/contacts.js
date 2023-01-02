const express = require('express');
const { httpError, tryCatchWrapper } = require('../../helpers/index.js');
const { validateBody } = require('../../middlewares/index');
const { addContactsSchema } = require('../schemas/contacts');

const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts');

const router = express.Router();

router.get('/', tryCatchWrapper(async (req, res, next) => {
  const contacts = await listContacts();
  await res.json(contacts);
  next();
}));

router.get('/:contactId', tryCatchWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return next(httpError(404, "Not found"));
  }

  return res.json(contact);
}));

router.post('/', validateBody(addContactsSchema), tryCatchWrapper(async (req, res, next) => {
  const { name, email, phone } = req.body;
    
  console.log("name:", name, "email:", email, "phone:", phone);
  const contacts = await addContact(name, email, phone);
  return res.status(201).json(contacts);
}));

router.delete('/:contactId', tryCatchWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return next(httpError(404, "Not found"));
  }
  await removeContact(contactId);
  return res.status(200).json({ message: "Contact deleted" });
}));

router.put('/:contactId', validateBody(addContactsSchema), tryCatchWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);
  if (!contact) {
    return next(httpError(404, "Not found"));
  }
  return res.status(200).json({contact});
  
}));

module.exports = router;
