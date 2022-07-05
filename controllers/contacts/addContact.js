const { createError, postContactJoiSchema } = require("../../helpers");
const { Contact } = require("../../models/contactSchema");

const addContact = async (req, res, next) => {
  try {
    const { error } = postContactJoiSchema.validate(req.body);
    if (error) {
      throw createError(400, "JoiError. Missing required field");
    }
    const { _id } = req.user;
    const contact = await Contact.create({ ...req.body, owner: _id });
    if (!contact) {
      throw createError(404);
    }
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
