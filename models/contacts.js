const { trusted } = require("mongoose");
const { Contact } = require("../models/contactModel");

/**
 * @author Yuliya Solovenuk
 * @returns {Array}
 */
const listContacts = async (req) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");
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
const addContact = async (req) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });

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

/**
 * @author Yuliya Solovenuk
 * @param {string}
 * @param {object}
 * @returns {object}
 */
const updateStatusFavoriteContact = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
  return contact;
};

/**
 * @author Yuliya Solovenuk
 * @param {object}
 * @param {object}
 * @returns {object}
 */
const filterContactsByQuery = async (user, query) => {
  const { favorite } = query;
  const { _id: owner } = user;
  const contacts = await Contact.find({ owner });
  let filtredContacts = contacts;

  if (favorite === "true") {
    filtredContacts = contacts.filter((contact) => {
      return contact.favorite === true;
    });
  }

  return filtredContacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusFavoriteContact,
  filterContactsByQuery,
};
