const createError = require("../helpers/createError");
const createResponse = require("../helpers/createResponse");
const { removeContact } = require("../models/contacts");

async function remove(req, res, next) {
  try {
    const result = await removeContact(req.params.contactId);
    if (!result) {
      throw createError(404);
    }
    createResponse(200, res, { message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = remove;
