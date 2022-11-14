const { Router } = require('express');

const Joi = require('joi');
const nameRegExp = /^[a-zA-Z][a-zA-Z\s]*$/;
const phoneRegExp = /^\(\d{3}\)\s?\d{3}-\d{4}/;

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact } = require('../../models/contacts');

const router = Router()

router.get('/', async (_, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  };
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);

    if (!contact) {
      const err = new Error(`Not found contact with id: ${id}`);
      err.status = 404;
      throw err;
    };

    return res.status(200).json(contact);
  } catch (error) {
    next(error);
  };
});

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const { name, email, phone } = body;

    const schema = Joi.object({
      name: Joi.string()
        .pattern(nameRegExp).min(3).max(30)
        .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      phone: Joi.string()
        .pattern(phoneRegExp)
        .required()
    });

    await schema.validateAsync(body);

    if (!name || !email || !phone) {
      const err = new Error('missing required name field');
      err.status = 400;
      throw err;
    };

    await addContact(body);
    res.status(201).json(body);
  } catch (error) {
    next(error);
  };
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await removeContact(id);

    if (!contact) {
      const err = new Error(`Not found contact with id: ${id}`);
      err.status = 404;
      throw err;
    };
    
    return res.status(200).json({ "message": `contact with id: ${id} was deleted` });
  } catch (error) {
    next(error);
  };
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const { name, email, phone } = body;

    const schema = Joi.object({
      name: Joi.string()
        .pattern(nameRegExp).min(3).max(30),
      email: Joi.string()
        .email({ minDomainSegments: 2 }),
      phone: Joi.string()
        .pattern(phoneRegExp),
    });

    await schema.validateAsync(body);
    
    if (!name && !email && !phone) {
      const err = new Error('missing fields');
      err.status = 400;
      throw err;
    };
    const contact = await updateContact(id, body);

    if (!contact) {
      const err = new Error(`Not found contact with id: ${id}`);
      err.status = 404;
      throw err;
    };

    return res.status(200).json(contact);
  } catch (error) {
    next(error);
  };
});


module.exports = router;
