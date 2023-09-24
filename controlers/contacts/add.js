const { addContact } = require("../../models/contacts");

const add = async (req, res, next) => {
  let { name, email, phone } = req.body;

  let newContact = await addContact({ name, email, phone });
  res.status(201).json(newContact);
};

module.exports = add;
