const { Types } = require("mongoose");

const Contact = require("../models/contactsModel");
const { AppError } = require("../utils");

/**
 * Chek if contact exists services.
 * @param {Object} filter
 * @returns {Promise<void>}
 */

exports.contactExists = async (filter) => {
  const contactExists = await Contact.exists(filter);

  if (contactExists)
    throw new AppError(409, "Contact with this email exists..");
};

/**
 * Chek if contact by id exists services.
 * @param {string} id
 * @returns {Promise<void>}
 */

exports.contactExistsById = async (id) => {
  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) throw new AppError(404, "Contact does not exist..");

  const contactExists = await Contact.exists({ _id: id });

  if (!contactExists) throw new AppError(404, "Contact does not exist..");
};

/**
 * Update contact data
 * @param {string} id
 * @param {*Object} contactData
 * @returns {Promise<Object>}
 */
exports.updateContacts = async (id, contactData) => {
  const contact = await Contact.findById(id);

  Object.keys(contactData).forEach((key) => {
    contact[key] = contactData[key];
  });

  return contact.save();
};
