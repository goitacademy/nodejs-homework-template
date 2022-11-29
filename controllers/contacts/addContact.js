const contacts = require("../../models/contacts");

async function addcontact(req, res, next) {
  const { name, email, phone } = req.body;
  const result = await contacts.addContact({ name, email, phone });

  res.status(201).json(result);
}
module.exports = addcontact;
