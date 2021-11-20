const express = require('express');
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index');
const Joi = require('joi');
const { required } = require('joi');

const schemaContactJoi = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
}); // вынести в отдельный файл

const validation = (schema) => {
  const contactValidation = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({ message: 'missing required name field' });
    }
    next();
  };
  return contactValidation;
};

router.get('/', (req, res, next) => {
  listContacts()
    .then((contacts) => res.json(contacts))
    // .catch((err) => next(err));
    .catch((err) => res.send(err));
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  getContactById(contactId)
    .then((contact) => res.json(contact))
    .catch(() => res.status(404).send({ message: 'Not found' }));
});

router.post('/', validation(schemaContactJoi), async (req, res, next) => {
  const { name, email, phone } = req.body;

  addContact(name, email, phone)
    .then((r) => res.status(201).json(r))
    .catch((err) => res.send(err));
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  removeContact(contactId)
    .then(() => res.json({ message: 'Contact deleted.' }))
    .catch((err) => res.status(404).send({ message: 'Not found' }));
});

router.put(
  '/:contactId',
  validation(schemaContactJoi),
  async (req, res, next) => {
    const { contactId } = req.params;
    updateContact(contactId, req.body)
      .then((r) => res.json(r))
      .catch((err) => res.status(404).send({ message: 'Not found' }));
  }
);

module.exports = router;
