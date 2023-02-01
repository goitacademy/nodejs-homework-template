const contactsRepository = require("../models/contacts");

const getAll = async (req, res, next) => {
  const result = await contactsRepository.getListContacts();
  res.json(result);
};

module.exports = {
  getAll,
};
