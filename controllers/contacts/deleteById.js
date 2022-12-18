const { createError } = require("../../helpers");
const { removeContact } = require("../../models/contactModel/contacts");
const {
  NOT_CONTACT_FOR_DELETING,
  CONTACT_DELETED,
} = require("./contactsConstants");

async function deleteById(req, res, next) {
  const { contactId } = req.params;

  const result = await removeContact(contactId);

  if (!result) {
    throw createError({ status: 400, message: NOT_CONTACT_FOR_DELETING });
  }

  res.status(200).json({ status: 200, id: result, message: CONTACT_DELETED });
}
module.exports = deleteById;
