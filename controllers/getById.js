const Contact = require("../models/contact");
const createError = require("../helpers/createError");
const createResponse = require("../helpers/createResponse");

async function getById(req, res, next) {
  try {
    const result = await Contact.findById(req.params.contactId);
    if (!result) throw createError(404);
    createResponse(200, res, result);
  } catch (error) {
    next(error);
  }
}

module.exports = getById;
