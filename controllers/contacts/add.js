// const Joi = require('joi');
const contactOperations = require('../../models/contacts');

// const contactsSchema = Joi.object({
//   name: Joi.string().min(3).required(),
//   email: Joi.string().email({ minDomainSegments: 2 }).required(),
//   phone: Joi.string()
//     .regex(/^\(([0-9]{3})\)([ ])([0-9]{3})([-])([0-9]{4})$/)
//     .message('Phone format (xxx) xxx-xxxx')
//     .required(),
// });

const add = async (req, res, next) => {
  // try {
  // const { error } = contactsSchema.validate(req.body);
  //  make validation of request
  // if (error) {
  //   error.status = 400;
  //   throw error;
  // }
  const result = await contactOperations.addContact(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });

  // const newContact = { id: v4(), ...req.body };
  // contacts.push(newContact);
  // res.status(201).json({
  //   status: 'success',
  //   code: 201,
  //   data: {
  //     result: newContact,
  //   },
  // });
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = add;
