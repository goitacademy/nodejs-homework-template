const ContactsService = require("../models/contacts.js");
const HttpError = require("../error/error.js");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await ContactsService.listContacts();
    res.json(result);
  } catch (error) {
     next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await ContactsService.getContactById(contactId);
    if (!contact) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json(contact);
  } catch (error) {
     next(error);
  }
  
};

const addNewContact = async (req, res, next) => {
  try {
    const newContact = await ContactsService.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
  
}

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await ContactsService.removeContact(contactId);
    if (!deletedContact) {
      throw HttpError(404, `Not found`);
    }
     res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContactId = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;

    const updatedContact = await ContactsService.updateContact(contactId, body);

    if (!updatedContact) {
      throw new HttpError(404, "Not found");
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addNewContact,
  deleteContact,
  updateContactId,
};
