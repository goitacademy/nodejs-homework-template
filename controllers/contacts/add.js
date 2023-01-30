const contactsRepository = require("../../models/contacts.js");
const { createHttpException } = require("../../helpers");
const { addContactSchema } = require("../../helpers/schemas");

const add = async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw createHttpException(400, error.message);
    }

    const { name, email, phone } = req.body;
    const result = await contactsRepository.create({ name, email, phone });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  add,
};
