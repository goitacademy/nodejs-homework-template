const contactsModel = require('../models/contactsModel');

const createContactSchema = require('../validation/createContactSchema');
const updateContactSchema = require('../validation/updateContactSchema');

const getAllContacts = async (req, res, next) => {
  try {
    const data = await contactsModel.listContacts();
    res.json({ data, message: 'list of all contacts' });
  } catch (error) {
    next(error);
  }
};

const getContactByid = async (req, res, next) => {
  try {
    console.log('hello ', req.params.contactId);
    const data = await contactsModel.getContactById(req.params.contactId);
    if (!data) {
      res.status(404);
      res.json({ message: 'User not found' });
      return;
    }
    res.json({ data, message: 'User data' });
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const { body } = req;

    const { error } = createContactSchema.validate(body);

    if (error) {
      res.status(400);
      res.json({ message: error.details[0]?.message });
      return;
    }
    const newContact = await contactsModel.addContact(body);

    res.status(201);
    res.json({ data: newContact, message: 'Create succesfull' });
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const deletedContact = await contactsModel.removeContact(contactId);
    if (!deletedContact) {
      res.status(404);
      res.json({ message: 'User not found' });
      return;
    }

    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const { body } = req;
    const { contactId } = req.params;
    const { error } = updateContactSchema.validate(body);

    if (error) {
      res.status(400);
      res.json({ message: error.details[0]?.message });
      return;
    }
    const updateContact = await contactsModel.updateContact(contactId, body);
    if (!updateContact) {
      res.status(404);
      res.json({ message: 'User not found' });
      return;
    }
    res.status(200);
    res.json({ data: updateContact, message: 'Contact update' });
  } catch (error) {
    next(error);
  }
};

const updateFavoriteContact = async (req, res, next) => {
  try {
    const { body } = req;
    const { contactId } = req.params;

    if (!body.favorite) {
      res.status(400);
      res.json({ message: 'Missing field favorite' });
      return;
    }

    const favoriteContact = await contactsModel.updateStatusContact(
      contactId,
      body.favorite
    );
    if (!favoriteContact) {
      res.status(404);
      res.json({ message: 'User not found' });
      return;
    }
    res.status(200);
    res.json({ data: favoriteContact, message: 'Favorite contact update' });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllContacts,
  getContactByid,
  addNewContact,
  deleteContactById,
  updateContactById,
  updateFavoriteContact,
};
