const contactsRepository = require("../models/contacts");

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const result = await contactsRepository.updateContact(id, {
    name,
    email,
    phone,
  });
  res.json(result);
};

module.exports = {
  updateById,
};
