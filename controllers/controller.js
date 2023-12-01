const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");
const HttpError = require("../helpers/HttpError");
require("dotenv").config();
require("../server");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (contact) {
      res.json(contact);
    } else {
      next(new HttpError(404, "Not found"));
    }
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return next(new HttpError(400, "Missing required fields"));
  }

  try {
    const newContact = await addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await removeContact(contactId);
    if (result) {
      res.json({ message: "Contact deleted" });
    } else {
      next(new HttpError(404, "Not found"));
    }
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

const updateContactData = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    return next(new HttpError(400, "Missing fields"));
  }

  try {
    const updatedContact = await updateContact(contactId, {
      name,
      email,
      phone,
    });
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      next(new HttpError(404, "Not found"));
    }
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

const updateContactStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined && Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing field favorite" });
  }

  try {
    const updatedContact = await updateStatusContact(contactId, { favorite });
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

const updateContactFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined && Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing field favorite" });
  }

  try {
    const updatedContact = await updateStatusContact(contactId, { favorite });
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactData,
  updateContactStatus,
  updateContactFavorite,
};
