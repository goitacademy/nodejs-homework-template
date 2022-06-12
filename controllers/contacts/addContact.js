const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const { body } = req;

  const result = await Contact.create(body);
  res.status(201).json({
    status: 201,
    data: { result },
  });
};

module.exports = addContact;
