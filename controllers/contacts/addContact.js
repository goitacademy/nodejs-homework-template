const { Contact } = require("../../models");

const addContact = async (req, res, next) => {
  // adding ID of user who adds a contact
  const { _id: owner } = req.user;

  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = addContact;
