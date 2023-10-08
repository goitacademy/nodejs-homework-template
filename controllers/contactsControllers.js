const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const HttpError = require("../helpers/HttpError");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new HttpError(404, "Not found");
    }
    const contact = await getContactById(id);
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new HttpError(404, "Not found");
    }
    if (id) {
      await removeContact(id);
      res.status(200).json({ message: "contact deleted" });
    }
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      throw new HttpError(400, "Missing required name field");
    }
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContactBody = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    if (!body) {
      throw new HttpError(400, "Missing fields");
    }
    const updatedContact = await updateContact(id, body);
    if (updatedContact) {
      res.status(200).json(updatedContact);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContact,
  deleteContact,
  createContact,
  updateContactBody,
};
