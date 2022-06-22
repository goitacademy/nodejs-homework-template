const Contact = require("../models/contact");
const createError = require("../helpers/createError");
const createResponse = require("../helpers/createResponse");

async function getAll(req, res) {
  const result = await Contact.find();
  if (!result) throw createError(404);
  createResponse(200, res, result);
}

module.exports = getAll;
