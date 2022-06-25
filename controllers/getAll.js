const Contact = require("../models/contact");
const createError = require("../helpers/createError");
const createResponse = require("../helpers/createResponse");

async function getAll(req, res) {
  const { id } = req.user;
  const { page, limit, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner: id, favorite: favorite }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "id email subscription");

  if (!result) throw createError(404);
  createResponse(200, res, result);
}

module.exports = getAll;
