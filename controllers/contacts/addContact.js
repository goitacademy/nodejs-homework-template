const operation = require("../../models/contacts");
const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await operation.addContact(name, email, phone);

  res.status(201).json({
    status: "created",
    code: "201",
    data: newContact,
  });
};
module.exports = addContact;
