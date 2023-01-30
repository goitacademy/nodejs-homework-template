const contactsRepository = require("../../models/contacts.js");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsRepository.getById(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getById,
};
