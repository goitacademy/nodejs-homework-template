const contactService = require("../services/contactService");

async function getAllContacts(req, res, next) {
  try {
    const contacts = await contactService.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContactById(req, res, next) {
  try {
    const contact = await contactService.getContactById(req.params.contactId);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
}

async function createContact(req, res, next) {
  try {
    const newContact = await contactService.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

async function updateExistingContact(req, res, next) {
  try {
    const updatedContact = await contactService.updateContact(
      req.params.contactId,
      req.body,
    );
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
}

async function deleteContact(req, res, next) {
  try {
    const wasDeleted = await contactService.removeContact(req.params.contactId);
    if (wasDeleted) {
      res.status(200).json({ message: "Contact removed!" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateExistingContact,
  deleteContact,
};
