const ContactsService = require("../models/contacts.js");
const HttpError = require("../error/error.js");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await ContactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(new HttpError(500, `Error fetching contacts: ${error.message}`));
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await ContactsService.getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
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
    const { id } = req.params;
    const deletedContact = await ContactsService.removeContact(id)
    if (deletedContact) {
      res.status(404).json({ message: "Not found" });
    }
     res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};
const updateContactId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateContact = await ContactsService.updateContact(id, req.body); 
    if (!updateContact) {
      throw new HttpError(404, `Not found`);
    }
    res.status(200).json(updateContact);
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
