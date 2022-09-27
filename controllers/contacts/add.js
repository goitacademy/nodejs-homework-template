const { contactsOperations } = require("../../models");

const add = async (req, res) => {
  const contact = await contactsOperations.addContact(req.body);

  res.status(201).json({ status: "success", code: 201, contact });
};

module.exports = add;
