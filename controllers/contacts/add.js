const contactsOperations = require("../../models/contacts");

const add = async (req, res, next) => {
  const contact = await contactsOperations.addContact(req.body);
  res.status(201).json({ status: "success", data: contact });
};

module.exports = add;