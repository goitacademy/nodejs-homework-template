const { Contact } = require("../../models/contacts");
const { schemas } = require("../../schemas/contacts");
const asyncHandler = require("express-async-handler");

const addContact = asyncHandler(async (req, res, next) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
});

module.exports = addContact;
