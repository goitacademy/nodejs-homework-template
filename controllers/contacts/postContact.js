const contactsOperations = require("../../models/contacts");
const { HttpError } = require("../../helpers/HttpError");

const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const postContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing required name field");
    }
    const contact = await contactsOperations.addContact(
      req.body
    );
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = postContact;
