const express = require('express');
const router = express.Router();
const Joi = require('joi');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const contactId = req.params.id;
  try {
    const contact = await getContactById(contactId);
    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
    console.log(error);
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const body = req.body;

  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });
  const { error } = schema.validate(body);
  if (error)
    return res.status(400).json({ message: `${error.details[0].message}` });

  try {
    const contact = await addContact(body);
    res.status(201).send(contact);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const contactId = req.params.id;
  try {
    const contact = await getContactById(contactId);
    if (!contact) return res.status(404).json({ message: 'Not found' });
    await removeContact(contactId);
    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  const contactId = req.params.id;
  const body = req.body;

  if (Object.keys(body).length === 0)
    return res.status(400).json({ message: 'missing fields' });

  const schema = Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  });
  const { error } = schema.validate(body);
  if (error) return res.status(404).send(error.details[0].message);

  try {
    const updatedContact = await updateContact(contactId, body);
    res.status(200).send(updatedContact);
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
    console.log(error);
    next(error);
  }
});

router.patch('/:contactId/favorite', async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;

  const schema = Joi.object().keys({
    favorite: Joi.boolean().required(),
  });
  const { error } = schema.validate(body);
  if (error) return res.status(404).send(error.details[0].message);

  if (Object.keys(body).length === 0)
    return res.status(400).json({ message: 'missing field favorite' });

  try {
    const updatedContact = await updateStatusContact(contactId, body);
    if (updatedContact) {
      res.status(200).send(updatedContact);
    } else return res.status(404).json({ message: 'Not found' });
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
    console.log(error);
    next(error);
  }
});

module.exports = router;
