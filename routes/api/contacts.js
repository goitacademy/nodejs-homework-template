const express = require('express');
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts');
const router = express.Router()

const contactSchema = Joi.object({
  name: Joi.string()
    .required(),
  email: Joi.string()
    .required(),
  phone: Joi.string()
    .required(),
  id: Joi.string()
    .required()
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({ status: 'success', code: 200, data: contacts })
  } catch (error) {
    next(error);
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id);
    !contact.length ?
      res.json({ status: "failed", code: 404, message: "Contact not found" })
      : res.json({ status: 'success', code: 200, data: contact });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;
    const id = uuidv4();
    const validate = contactSchema.validate({
      name, phone, email, id
    });
    validate.error &&
      res.json({ status: "failed", code: 400, message: validate.error.message });
    const newContact = await addContact(id, name, phone, email);
    res.json({ status: "success", code: 201, data: newContact });
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const removedContact = await removeContact(req.params.id);
    removedContact.length ? res.json({ status: "success", code: 200, message: "Contact deleted" })
      : res.json({ status: "failed", code: 404, message: "Contact not found" })
  } catch (error) {
    next(error);
  }
})

router.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  const { name, phone, email } = req.body;
  const validate = contactSchema.validate({
    name, phone, email, id
  });
  validate.error &&
    res.json({ status: "failed", code: 400, message: "Missing fields" });
  const updatedContact = await updateContact(id, name, phone, email);
  !updatedContact.length && res.json({ status: "failed", code: 404, message: 'Contact not found.' })
  res.json({ status: "success", code: 200, message: 'Contact updated.', data: { id, name, phone, email } });
})

module.exports = router;
