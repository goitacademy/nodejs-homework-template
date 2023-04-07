const { addContact } = require("../../models/contacts");
const { addSchema } = require("../../schemas/contacts");
const createError = require("../../helpers/createError");

const add = async (req, res, next) => {
  const contact = req.body;
  const { error } = addSchema.validate(contact);

  if (error) {
    throw createError(400, error.message);
  }
  const result = await addContact(contact);
  res.status(201).json(result);
};

module.exports = add;
