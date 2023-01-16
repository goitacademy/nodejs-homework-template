const { addContact } = require("../../models");
const { getSuccessResponse } = require("../../utils");

const add = async (req, res) => {
  const { name, email, phone } = req.body;

  const contact = await addContact(name, email, phone);

  res.status(201).json(getSuccessResponse(contact, 201));
};

module.exports = add;
