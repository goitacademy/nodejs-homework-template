const contactsRepository = require("../../models/contacts.js");

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    await contactsRepository.removeById(id);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteById,
};
