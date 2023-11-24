const { nanoid } = require("nanoid");
const contacts = require("../../models/contacts");

const addNew = async (req, res) => {
  const newContacts = {
    id: nanoid(),
    ...req.body,
  };
  const result = await contacts.addContact(newContacts);
  res.status(201).json(result);
};

module.exports = addNew;
