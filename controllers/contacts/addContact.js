const { Contact } = require("../../models");
const { ctrlBox } = require("../../helpers");

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = ctrlBox(addContact);
