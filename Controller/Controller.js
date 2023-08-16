const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateContactStatus,
  removeContact,
} = require("../models/contacts");
const { HttpError } = require("../Error/Error");
const {
  schemaCreateContact,
  schemaUpdateContact,
} = require("../validator/validator");

const getAll = async (_, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error getting all contacts:", error);
    throw new HttpError(500, "Internal Server Error");
  }
};

const getById = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);

    if (!contact) {
      throw new HttpError(404, "Not found");
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error("Error getting contact by ID:", error);
    throw new HttpError(500, "Internal Server Error");
  }
};

const create = async (req, res) => {
  try {
    const { error, value } = schemaCreateContact.validate(req.body);

    if (error) {
      throw new HttpError(400, error.message);
    }

    const { name, email, phone } = value;

    const newContact = await addContact(name, email, phone);

    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error creating contact:", error);
    throw new HttpError(500, "Internal Server Error");
  }
};

const update = async (req, res) => {
  try {
    const contactId = req.params.contactId;

    const { error, value } = schemaUpdateContact.validate(req.body);

    if (error) {
      throw new HttpError(400, error.message);
    }

    const { name = null, email = null, phone = null } = value;

    const updatedContact = await updateContact(contactId, name, email, phone);

    if (!updatedContact) {
      throw new HttpError(404, "Not found");
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    throw new HttpError(500, "Internal Server Error");
  }
};

const updateStatus = async (req, res) => {
  try {
    const contactId = req.params.contactId;

    if (!("favorite" in req.body)) {
      res.status(400).json({ message: "missing field favorite" });
      return;
    }

    const { error, value } = schemaUpdateContact.validate(req.body);

    if (error) {
      throw new HttpError(400, error.message);
    }

    const { favorite = null } = value;

    const updatedContact = await updateContactStatus(contactId, favorite);

    if (!updatedContact) {
      throw new HttpError(404, "Not found");
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    throw new HttpError(500, "Internal Server Error");
  }
};

const deleteById = async (req, res) => {
  try {
    const contactId = req.params.contactId;

    const contact = await removeContact(contactId);

    if (!contact) {
      throw new HttpError(404, "Not found");
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw new HttpError(500, "Internal Server Error");
  }
};

module.exports = {
  getAll: getAll,
  getById: getById,
  create: create,
  update: update,
  updateStatus: updateStatus,
  deleteById: deleteById,
};