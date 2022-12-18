const Contact = require("../../models/contact");

const { httpError } = require("../../helpers");

const { addSchema } = require("../../schemas/contactsSchema");

const add = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw httpError(400, error.message);
  }
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json(result);
};

module.exports = add;
