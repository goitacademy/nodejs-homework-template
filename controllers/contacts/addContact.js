const { Contact, joiSchema } = require("../../models/contacts");
const { createError } = require("../../helpers");

const addContact = async (req, res, next) => {
  // const { _id } = req.user;
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = addContact;
