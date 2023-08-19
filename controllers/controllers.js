/* eslint-disable no-unused-vars */
const {
  getAllContactsService,
  getContactByIdService,
  addContactService,
  updateContactService,
  removeContactService,
} = require("../services/services");

const getAllContacts = async (req, res, next) => {
  try {
    const contactsJson = await getAllContactsService();
    res.json(contactsJson);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(req.params, "req params conrol");
    const dataContacts = await getContactByIdService(contactId);
    res.status(200).json(dataContacts);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { body } = req.body;
    const dataContacts = await addContactService(body);

    res.status(201).json(dataContacts);
    console.log(dataContacts, "create");
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req.body;
    const dataContacts = updateContactService(contactId, body);

    res.status(200).json(dataContacts);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const dataContacts = await removeContactService(contactId);

    res.status(200).json(dataContacts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
