const Contacts = require('../model/contacts-methods');

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.getAllContacts();
    return res.json({ status: 'success', code: 200, payload: contacts });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const requestedContact = await Contacts.getContactById(req.params.contactId);

    if (!requestedContact) {
      return res.status(404).json({ status: 'error', code: 404, message: 'Not found.' });
    }

    return res.json({ status: 'success', code: 200, payload: requestedContact });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const newContact = await Contacts.addContact(req.body);
    return res
      .status(201)
      .json({ status: 'success', code: 201, message: 'New contact was created.', payload: newContact });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const removedContact = await Contacts.removeContact(req.params.contactId);

    if (!removedContact) {
      return res.status(404).json({ status: 'error', code: 404, message: 'Not found.' });
    }

    return res.json({
      status: 'success',
      code: 200,
      message: 'Contact deleted.',
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const updatedContact = await Contacts.updateContact(req.params.contactId, req.body);

    if (!updatedContact) {
      return res.status(404).json({ status: 'error', code: 404, message: 'Not found.' });
    }

    return res.json({
      status: 'success',
      code: 200,
      message: 'Contact updated.',
      payload: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const updatedFavorite = await Contacts.updateContact(req.params.contactId, req.body);

    if (!updatedFavorite) {
      return res.status(404).json({ status: 'error', code: 404, message: 'Not found.' });
    }

    return res.json({
      status: 'success',
      code: 200,
      message: 'Contact updated.',
      payload: updatedFavorite,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact };
