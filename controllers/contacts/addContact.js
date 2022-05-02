const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const contacts = await Contact.create(req.body);
  res
    .status(201)
    .json({ status: "success", code: 201, data: { result: contacts } });
};

module.exports = addContact;
