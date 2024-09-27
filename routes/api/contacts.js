const express = require('express');

const router = express.Router();
const Joi = require('joi');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: 'succes',
      code: 200,
        data: {
          contacts,
        },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "missing required name field" });
    }

    const newContact = await addContact(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
  
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    
    await removeContact(req.params.contactId);

    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const { error } = contactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }
    const updatedContact = await updateContact(contactId, req.body);

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updateContact);
  } catch (error) {
    next(error);
  }
  // res.json({ message: 'template message' })
})

module.exports = router
