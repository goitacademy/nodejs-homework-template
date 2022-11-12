const contactsDB = require("../service/contacts");

const getContactsList = async (req, res, next) => {
  try {
    const contacts = await contactsDB.getContacts();
    return res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await contactsDB.getContactById(req.params.contactId);
    if (contact) {
      return res.status(200).json(contact);
    }
    return res.status(404).json({ message: "Not found" });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const newContact = await contactsDB.createContact(req.body);
    return res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const deletedContact = await contactsDB.removeContact(req.params.contactId);
    if (deletedContact) {
      return res.status(200).json({
        message: "Contact deleted",
      });
    }
    return res.status(404).json({ message: "Not found" });
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const updatedContact = await contactsDB.updateContact(
      req.params.contactId,
      req.body
    );
    return res.status(201).json(updatedContact);
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const updatedStatus = await contactsDB.updateContact(
      req.params.contactId,
      req.body,
      {
        new: true,
      }
    );
    if (req.body) {
      return res.status(201).json(updatedStatus);
    }
    return res.status(404).json({ message: "Not found" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getContactsList,
  getById,
  create,
  removeContact,
  updateContact,
  updateStatus,
};
