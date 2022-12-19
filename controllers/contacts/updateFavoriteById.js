const { createError } = require("../../helpers");
const {
  updateFavoriteContact,
  getContactById,
} = require("../../models/contactModel/contacts");
const {
  NOT_CONTACT_FOR_UPDATING,
  CONTACT_UPDATED,
} = require("./contactsConstants");

async function updateFavoriteById(req, res, next) {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    throw createError({ status: 400, message: NOT_CONTACT_FOR_UPDATING });
  }

  const updatedContact = await updateFavoriteContact(
    contactId,
    !contact.favorite
  );

  if (!updatedContact) {
    throw createError({ status: 400, message: NOT_CONTACT_FOR_UPDATING });
  }

  res.status(200).json({
    status: 200,
    updatedContact: updatedContact,
    message: CONTACT_UPDATED,
  });
}
module.exports = updateFavoriteById;
