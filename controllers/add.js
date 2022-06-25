const Contact = require("../models/contact");
const createError = require("../helpers/createError");
const createResponse = require("../helpers/createResponse");
const { contactSchema } = require("../validation/schema");

async function add(req, res, next) {
  const { id } = req.user;
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) throw createError(400, error.message);

    const result = await Contact.create({ ...req.body, owner: id });

    createResponse(201, res, result);
  } catch (error) {
    next(error);
  }
}

module.exports = add;
