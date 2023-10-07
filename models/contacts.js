const fs = require("node:fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");
const { Contact } = require("../models/contactModel");

const CONTACTS_PATH = path.join(__dirname, "contacts.json");

/**
 * @author Yuliya Solovenuk
 * @returns {Array}
 */
const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

/**
 * @author Yuliya Solovenuk
 * @param {string}
 * @returns {object}
 */
const getContactById = async (id) => {
  const contactById = await Contact.findById(id);

  return contactById || null;
};

/**
 * @author Yuliya Solovenuk
 * @param {object}
 * @returns {object}
 */
const addContact = async (body) => {
  const { name, email, phone } = body;

  const newContact = await Contact.create({
    name,
    email,
    phone,
  });

  return newContact;
};

/**
 * @author Yuliya Solovenuk
 * @param {string}
 * @returns {object}
 */
const removeContact = async (id) => {
  const deletedContact = await Contact.findByIdAndDelete(id);

  return deletedContact;
};

/**
 * @author Yuliya Solovenuk
 * @param {string}
 * @param {object}
 * @returns {object}
 */
const updateContact = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(id, body, { new: true });

  return contact;
};

const updateStatusFavoriteContact = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusFavoriteContact,
};
