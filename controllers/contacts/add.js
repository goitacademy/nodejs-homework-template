const { addContact } = require("../../models/contacts");

const add = async (req, res, next) => {
  const contact = await addContact(req.body);
  res.status(201).json({ contact });
};

module.exports = add;
