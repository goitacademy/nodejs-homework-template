const Joi = require('joi');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
} = require('../models/db-service/contacts');

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .min(5)
    .max(35),

  phone: Joi.string().min(5).max(15).required(),
  favorite: Joi.boolean(),
});

const getAllContactsController = async (req, res, next) => {
  try {
    // берется из authMiddleware
    const { _id: userId } = req.user;
    const contacts = await listContacts(userId);
    res.json(contacts);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const addNewContactController = async (req, res, next) => {
  try {
    const validationBody = schema.validate(req.body);
    if (validationBody.error) {
      return res.status(400).json({ message: validationBody.error.message });
    }

    // берется из authMiddleware
    const { _id: userId } = req.user;

    const newContact = await addContact(req.body, userId);
    res.status(201).json(newContact);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getOneContactController = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const contact = await getContactById(req.params.contactId, userId);
    res.json(contact);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const removeOneContactController = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const removedContact = await removeContact(req.params.contactId, userId);
    if (removedContact.length === 0) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'contact deleted' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateOneContactController = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const validationBody = schema.validate(req.body);
    if (validationBody.error) {
      return res.status(400).json({ message: 'missing fields' });
    }

    const updatedContact = await updateContactById(req.params.contactId, req.body, userId);

    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateFavoriteController = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    if (!req.body) {
      res.status(400).json({ message: 'missing field favorite' });
    }
    const contact = await updateStatusContact(req.params.contactId, req.body, userId);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(contact);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllContactsController,
  addNewContactController,
  getOneContactController,
  removeOneContactController,
  updateOneContactController,
  updateFavoriteController,
};
