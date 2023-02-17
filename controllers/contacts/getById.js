const { createError } = require("../../helpers");
const { getContactById } = require("../../models/contacts");
const { CONTACT_NOT_FOUND } = require("./contactsConstants");

async function getbyId(req, res, next) {
  const { contactId } = req.params;

  const result = await getContactById(contactId);

  if (!result) {
    throw createError({ status: 404, message: CONTACT_NOT_FOUND });
  }

  res.json(result);
}
module.exports = getbyId;
