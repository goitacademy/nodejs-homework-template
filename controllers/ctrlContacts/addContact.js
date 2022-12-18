const { contactsService } = require("../../services");

const addContact = async (req, res) => {
  const { body } = req;

  const result = await contactsService.addContact(body);

  res.status(201).json(result);
};

module.exports = addContact;
