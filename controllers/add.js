const { Contact, schemas } = require("../models/contactsShema");
const { createError } = require("../helpers");

const add = async (req, res) => {
  const { error } = schemas.add.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  const result = new Contact(req.body);
  await result.save();
  res.status(201).json(result);
};
module.exports = add;
