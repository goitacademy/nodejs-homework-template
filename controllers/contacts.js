const contacts = require("../models/contacts");
const {
  HttpError,
  ctrlWrapper,
} = require("../helpers");

const getAllContacts = async (req, res, next) => {
    const result = await contacts.listContacts();
    res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
};

const addContact = async (req, res, next) => {
       const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

const deleteContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
};

const updateContactById = async (req, res, next) => {
    
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
};
