const { Contact } = require("../../models/contact");

const postContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

module.exports = postContact;
