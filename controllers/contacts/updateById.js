const { createError } = require("../../helpers");
const { updateContact } = require("../../models/contacts");
const {
  NOT_CONTACT_FOR_UPDATING,
  CONTACT_UPDATED,
} = require("./contactsConstants");

async function updateById(req, res, next) {
  const {
    params: { contactId },
    body,
  } = req;

  const updatedContact = await updateContact(contactId, body);

  if (!updatedContact) {
    throw createError({ status: 400, message: NOT_CONTACT_FOR_UPDATING });
  }

  res.status(200).json({
    updatedContact: updatedContact,
    message: CONTACT_UPDATED,
  });
}
module.exports = updateById;
