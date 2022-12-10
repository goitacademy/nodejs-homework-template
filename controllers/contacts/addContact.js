const { addContact } = require("../../models/contacts");
const { v4 } = require("uuid");

const addNewContact = async (req, res) => {
  const { body } = req;
  const id = v4();
  const newContact = await addContact({ ...body, id });
  res.status(200).json({ status: "success", data: newContact });
};

module.exports = addNewContact;
