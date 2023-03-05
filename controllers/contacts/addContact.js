const contactModel = require('../../models/contact');
const { HttpError } = require('../../helpers');
const Joi = require('joi');

const requestBodySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const addContact = async (req, res) => {
  const { error } = requestBodySchema.validate(req.body);
  const { _id: owner } = req.user;

  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contactModel.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = addContact;
