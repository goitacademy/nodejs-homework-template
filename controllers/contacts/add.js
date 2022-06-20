const { Contact } = require("../../models/contacts");

const add = async (req, res, next) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

module.exports = add;
