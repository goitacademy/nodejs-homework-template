const createError = require("../helpers/createError");
const createResponse = require("../helpers/createResponse");
const { listContacts } = require("../models/contacts");

async function getAll(req, res) {
  const result = await listContacts();
  if (!result) throw createError(404);
  createResponse(200, res, result);
}

module.exports = getAll;
