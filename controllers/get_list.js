const contactsRepository = require("../models/contacts");

const get_list = async (req, res, next) => {
  const result = await contactsRepository.listContacts();
  res.json(result);
};

module.exports = {
  get_list,
};
