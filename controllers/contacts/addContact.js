const { Contacts } = require("../../model");

const addContact = async (req, res) => {
  const { _id } = reg.user;
  const result = await Contacts.create({ ...reg.body, owner: _id });
  res.status(201), res.json(result);
};

module.exports = addContact;
