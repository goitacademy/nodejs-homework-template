const { addContact } = require("../../models/contacts");
const { v4 } = require("uuid");

const addNewContact = async (req, res) => {
  const { body } = req;
  const id = v4();
  body.id = id;
  const newContact = await addContact(body);
  res.status(200).json({ status: "success", data: newContact });
};

module.exports = addNewContact;
