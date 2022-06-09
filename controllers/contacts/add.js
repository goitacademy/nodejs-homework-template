const contacts = require("../../models");

const scheme = require("../../schemas");

const add = async (req, res) => {
  const { error } = scheme.verifyContact.validate(req.body);

  if (error) {
    throw generateError(400, error.message);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

module.exports = add;
