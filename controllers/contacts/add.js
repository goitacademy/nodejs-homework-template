const { createError } = require("../../helpers");
const { Contact, schemas } = require("../../models/contacts");

const add = async (req, res) => {
  const { error } = schemas.add.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = add;
