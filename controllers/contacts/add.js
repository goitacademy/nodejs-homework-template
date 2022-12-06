const Contact = require("../../models/Contacts");

async function add(req, res) {
  const { name, email, phone, favorite } = req.body;

  const result = await Contact.create({ name, email, phone, favorite });

  res.status(201).json(result);
}

module.exports = add;
