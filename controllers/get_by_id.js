const contactsRepository = require("../models/contacts");

const get_by_id = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contactsRepository.getContactById(contactId);
  res.json(result);
};

module.exports = {
  get_by_id,
};
