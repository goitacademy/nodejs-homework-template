const contactsRepository = require("../../models/contacts.js");

const getAll = async (req, res, next) => {
  try {
    const result = await contactsRepository.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
};
