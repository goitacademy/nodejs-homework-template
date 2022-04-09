const contactsModel = require("../../models/contacts");

const addContact = async (req, res, next) => {
  const contact = await contactsModel.addContact(req.body);

  res.status(201).json({ status: "success", code: 201, payload: { contact } });
};

module.exports = addContact;
