/* eslint-disable no-unused-vars */
const {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
} = require("../services/services");

const getAllContactsController = async (req, res, next) => {
  try {
    const contactsJson = await listContacts();

    res.status(200).json(contactsJson);
  } catch (error) {
    next(error);
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dataContacts = await getById(id);

    if (dataContacts) {
      res.status(200).json(dataContacts);
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const createContactController = async (req, res, next) => {
  try {
    const { body } = req;
    const requiredField = ["name", "email", "phone"];

    const objectKeys = Object.keys(body);
    const findValue = requiredField.filter(
      (value) => !objectKeys.includes(value)
    );

    if (findValue.length > 0) {
      res.status(400).json({ message: `Missing required ${findValue} field` });
    }
    const dataContacts = await addContact(body);

    res.status(201).json(dataContacts);
  } catch (error) {
    next(error);
  }
};

const updateContactController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    if (!body) {
      res.status(400).json({ message: "Missing fields" });
    }

    const dataContacts = updateContact(id, body);

    res.status(200).json(dataContacts);
  } catch (error) {
    next(error);
  }
};

const deleteContactController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dataContacts = await removeContact(id);
    if (dataContacts) {
      res.status(200).json({ message: "Contact deleted" });
    }
    res.status(404).json({ Message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
};
