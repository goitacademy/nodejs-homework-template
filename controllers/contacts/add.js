const { Contact } = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { error } = Contact.create(req.body);
  if (error) {
    throw RequestError(404, "missing required name field");
  }
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = add;
