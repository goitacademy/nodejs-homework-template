const { addContact } = require("../models");
const contactValidation = require("../middlewares");

const addContactController = async (req, res) => {
  const { error } = contactValidation.validate(req.body);
  const { name, email, phone } = req.body;

  const missing = !name || !email || !phone;
  const word = !name ? "name" : !email ? "email" : "phone";

  const errorHandling = (code, message) => {
    return res.status(code).json({ message: message });
  };

  if (missing) {
    return errorHandling(400, `missing ${word} field`);
  }
  if (error) {
    return errorHandling(400, error.details[0].message);
  }

  const newContact = await addContact(req.body);

  if (!newContact) {
    return errorHandling(400, "contact with same data already exists");
  }

  return res.status(201).json(newContact);
};

module.exports = addContactController;
