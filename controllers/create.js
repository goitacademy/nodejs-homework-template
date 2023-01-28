const contactsRepository = require("../models/contacts");

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const result = await contactsRepository.addContact({ name, email, phone });
  res.status(201).json(result);
};

module.exports = {
  create,
};
