const contactsOperations = require("../../models/contacts");

const addContact = async (req, res) => {
  const { body } = req;

  const result = await contactsOperations.addContact(body);
  res.status(201).json({
    status: 201,
    data: { result },
  });
};

module.exports = addContact;
