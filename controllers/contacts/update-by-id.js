const contactsRepository = require("../../models/contacts.js");
const { createHttpException } = require("../../helpers");
const { addContactSchema } = require("../../helpers/schemas");

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const { error } = addContactSchema.validate({ name, email, phone });
    if (error) {
      throw createHttpException(400, error.message);
    }

    const result = await contactsRepository.updateById(id, {
      name,
      email,
      phone,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateById,
};
