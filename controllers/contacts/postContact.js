const validation = require("../../models/validation");
const { addContact } = require("../../models/contacts");

module.exports = async (req, res, next) => {
  const validationResult = validation(req.body);
  if (validationResult.error) {
    res.status(400).json({ message: validationResult.error.details });
    return;
  }

  const newContact = await addContact(req.body);
  res.status(201).json({ status: "Created", data: newContact });
};
