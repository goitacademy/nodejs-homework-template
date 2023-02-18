<<<<<<< Updated upstream
const Joi = require('joi');
const operations = require('../../models/operations');

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});
=======
const { Contact } = require('../../models/contacts');
>>>>>>> Stashed changes

const addContact = async (req, res, next) => {
  const { _id } = req.user;

  try {
<<<<<<< Updated upstream
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await operations.add(req.body);
=======
    const result = await Contact.create({ ...req.body, owner: _id });
>>>>>>> Stashed changes
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
