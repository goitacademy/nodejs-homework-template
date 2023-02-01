const contactsRepository = require("../models/contacts");
const deleteById = async (req, res, next) => {
  const { id } = req.params;

  await contactsRepository.removeContact(id);
  res.status(204).send();
};

module.exports = {
  deleteById,
};
