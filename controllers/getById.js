const createError = require("../helpers/createError");
const createResponse = require("../helpers/createResponse");
const { getContactById } = require("../models/contacts");

async function getById(req, res, next) {
  try {
    const result = await getContactById(req.params.contactId);
    if (!result) throw createError(404);
    createResponse(200, res, result);
  } catch (error) {
    next(error);
  }
}

module.exports = getById;
