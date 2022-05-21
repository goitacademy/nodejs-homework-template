const { createError } = require("../../helpers");
const { Contact, schemas } = require("../../models/contact");

const add = async (req, res) => {
  const { _id } = req.user;
  const { error } = schemas.add.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const result = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json(result);
};

module.exports = add;
