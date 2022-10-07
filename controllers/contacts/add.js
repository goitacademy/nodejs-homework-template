const { Contact } = require("../../models/contacts/contact");

async function add(req, res) {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
}

module.exports = add;
