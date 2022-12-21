const { createError } = require("../../helpers");
const { getContactById } = require("../../models/contactModel/contacts");
const { CONTACT_NOT_FOUND } = require("./contactsConstants");

async function getbyId(req, res, next) {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    throw createError({ status: 404, message: CONTACT_NOT_FOUND });
  }

  res
    .status(200)
    .json({ status: 200, data: contact, message: CONTACT_NOT_FOUND });
}
module.exports = getbyId;
