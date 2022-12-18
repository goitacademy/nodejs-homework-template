const { createError } = require("../../helpers");
const { updateFavoriteContact } = require("../../models/contacts");
const {
  NOT_CONTACT_FOR_UPDATING,
  CONTACT_UPDATED,
} = require("./contactsConstants");

async function updateFavoriteById(req, res, next) {
  const {
    params: { contactId },
    body,
  } = req;

  const updatedContact = await updateFavoriteContact(contactId, body);

  if (!updatedContact) {
    throw createError({ status: 400, message: NOT_CONTACT_FOR_UPDATING });
  }

  res.status(200).json({
    updatedContact: updatedContact,
    message: CONTACT_UPDATED,
  });
}
module.exports = updateFavoriteById;
