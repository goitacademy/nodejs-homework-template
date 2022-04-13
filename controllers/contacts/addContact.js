const Contact = require("../../models/contact");

const addContact = async (req, res, next) => {
  const { body } = req;
  const contact = await Contact.create(body);

  res.status(201).json({ status: "success", code: 201, payload: { contact } });
};

module.exports = addContact;
