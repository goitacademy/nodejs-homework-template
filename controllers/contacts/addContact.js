const { Contact, addSchema } = require("../../models");
const { createError } = require("../../helpers");

const addContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw createError(400, (error.message = "missing required name field"));
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
