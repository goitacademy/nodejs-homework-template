// const Joi = require('joi');
// const operations = require('../../models/operations');

// const schema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().required(),
// });

const { Contact, schema } = require('../../models/contacts');

const updateContact = async (req, res, next) => {
  try {
    // const { error } = schema.validate(req.body);
    // if (error) {
    //   error.status = 400;
    //   throw error;
    // }

    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
