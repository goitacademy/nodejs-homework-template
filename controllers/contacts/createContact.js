const { Contact } = require("../../models");

const createContact = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(201).json(data);
};

module.exports = createContact;
