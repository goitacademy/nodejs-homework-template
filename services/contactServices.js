const validateData = require("../middlewares/validateData");
const {
  Contact,
  schemas,
} = require("../models/contact");

const HttpError = require("../utils/HttpError");

/** ===============
 * GET ALL CONTACTS ===============
 * @returns {Array<object>}
 */
const findContacts = async(owner) => {
   return await Contact.find(owner);
};

/** ===============
 * GET ONE CONTACT BY ID ===============
 * @param {String} contactId
 * @returns {Object}
 */
const findOneContact = async (contactId) => {
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  return result;
};

/** ===============
 * CREATE NEW CONTACT ===============
 * @param {Object} body
 * @returns {Object}
 */
const addContact = async (body) => {
  const { error } = validateData(schemas.addContactSchema);
  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await Contact.create(body);

  return result;
};

/** ===============
 * REMOVE CONTACT BY ID ===============
 * @param {String} contactId
 * @returns {Promise}
 */
const deleteContactById = async (contactId) => {
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw HttpError(404, "Contact not found or already have been deleted");
  }
  return result;
};

/** ===============
 * UPDATE (PUT REQUEST) AN EXISTING CONTACT ===============
 * @param {String} contactId
 * @param {Object} body
 * @returns {Object}
 */
const updateContact = async (contactId, body) => {
  const { error } = validateData(schemas.addContactSchema).validate(body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Contact not found");
  }

  return result;
};

/** ===============
 * UPDATE (PATCH REQUEST) "FAVORITE" STATUS FOR CONTACT ===============
 * @param {String} contactId
 * @param {Object} body
 * @returns {Object}
 */
const updateContactStatus = async (contactId, body) => {
  const { error } = validateData(schemas.updateFavoriteSchema).validate(body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Contact not found");
  }

  return result;
};

module.exports = {
  findContacts,
  findOneContact,
  addContact,
  deleteContactById,
  updateContact,
  updateContactStatus,
};
