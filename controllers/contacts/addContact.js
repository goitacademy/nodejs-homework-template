const { Contact } = require("../../models/contact");

const addContacts = async (req, res, next) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

module.exports = addContacts;
