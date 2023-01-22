const { Contacts } = require("../../model");

const addContact = async (req, res) => {
  const { _id } = req.user;
  const result = await Contacts.create({ ...req.body, owner: _id });

  res.status(201), res.json({ result });
};

module.exports = addContact;
