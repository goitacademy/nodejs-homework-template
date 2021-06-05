const Contacts = require('../model/contacts-methods');
const { HttpCodes } = require('../helpers/constants');

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const query = req.query;
    const { docs: contacts, ...rest } = await Contacts.getAllContacts(userId, query);
    return res.json({ status: 'success', code: HttpCodes.OK, payload: { contacts, ...rest } });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const requestedContact = await Contacts.getContactById(userId, req.params.contactId);

    if (!requestedContact) {
      return res
        .status(HttpCodes.NOT_FOUND)
        .json({ status: 'error', code: HttpCodes.NOT_FOUND, message: 'Not found.' });
    }

    return res.json({ status: 'success', code: HttpCodes.OK, payload: requestedContact });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const newContact = await Contacts.addContact({ owner: userId, ...req.body });

    return res
      .status(HttpCodes.CREATED)
      .json({ status: 'success', code: HttpCodes.CREATED, message: 'New contact was created.', payload: newContact });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const removedContact = await Contacts.removeContact(userId, req.params.contactId);

    if (!removedContact) {
      return res
        .status(HttpCodes.NOT_FOUND)
        .json({ status: 'error', code: HttpCodes.NOT_FOUND, message: 'Not found.' });
    }

    return res.json({
      status: 'success',
      code: HttpCodes.OK,
      message: 'Contact deleted.',
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updatedContact = await Contacts.updateContact(userId, req.params.contactId, req.body);

    if (!updatedContact) {
      return res
        .status(HttpCodes.NOT_FOUND)
        .json({ status: 'error', code: HttpCodes.NOT_FOUND, message: 'Not found.' });
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
    const userId = req.user.id;
    const updatedFavorite = await Contacts.updateContact(userId, req.params.contactId, req.body);

    if (!updatedFavorite) {
      return res
        .status(HttpCodes.NOT_FOUND)
        .json({ status: 'error', code: HttpCodes.NOT_FOUND, message: 'Not found.' });
    }

    return res.json({
      status: 'success',
      code: HttpCodes.OK,
      message: 'Contact updated.',
      payload: updatedFavorite,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact };
