const contactsRepository = require("../models/contacts");
const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsRepository.getContactById(id);
  res.json(result);
};

module.exports = {
  getById,
};
