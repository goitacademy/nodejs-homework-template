/* eslint-disable semi */
const Contacts = require('../model/contacts');

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({
      status: 'Success',
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);

    if (contact) {
      return res.json({
        status: 'Success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(400).json({
        status: 'Error',
        code: 400,
        message: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
      status: 'Success',
      code: 201,
      message: 'New contact has been added',
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);

    if (contact) {
      return res.json({
        status: 'Success',
        code: 200,
        message: 'Contact has been deleted',
        data: {
          contact,
        },
      });
    } else {
      return res.status(400).json({
        status: 'Error',
        code: 404,
        message: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
    );

    if (contact) {
      return res.json({
        status: 'Success',
        code: 200,
        message: 'Contact has been updated',
        data: {
          contact,
        },
      });
    } else {
      return res.status(400).json({
        status: 'Error',
        code: 404,
        message: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
