const contactOperations = require("../../models/contacts");

const add = async (req, res) => {
  const result = await contactOperations.addContact(req.body);
  res.status(201).json(result);
};

module.exports = add;
