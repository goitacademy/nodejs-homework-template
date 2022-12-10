const contactsOperations = require("../../models/contacts");

const add = async (req, res) => {
  const addedContact = await contactsOperations.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    addedContact,
  });
};

module.exports = add;
