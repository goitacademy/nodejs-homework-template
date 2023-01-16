// const Joi = require('joi');
const contactOperations = require('../../models/contacts');
const { NotFound } = require('http-errors');

// const contactsSchema = Joi.object({
//   name: Joi.string().min(3).required(),
//   email: Joi.string().email({ minDomainSegments: 2 }).required(),
//   phone: Joi.string()
//     .regex(/^\(([0-9]{3})\)([ ])([0-9]{3})([-])([0-9]{4})$/)
//     .message('Phone format (xxx) xxx-xxxx')
//     .required(),
// });

const updateById = async (req, res, next) => {
  try {
    // const { error } = contactsSchema.validate(req.body);
    //  make validation of request
    // if (error) {
    //   error.status = 400;
    //   throw error;
    // }

    const { contactId } = req.params;

    const result = await contactOperations.updateContact(contactId, req.body);

    if (!result) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
