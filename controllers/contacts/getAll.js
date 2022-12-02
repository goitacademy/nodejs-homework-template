const Contact = require("../../models/Contacts");

async function getAll(req, res) {
  const result = await Contacts.find({});

  res.json(result);
}

module.exports = getAll;
