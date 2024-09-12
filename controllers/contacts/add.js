const contactsAction = require('../../models/index');
// const Joi = require('joi');
// const { BadRequest } = require('http-errors');

// const joiShema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });
// const { joiShema } = require('../../schemas/contacts');

const add = async (req, res, next) => {
  // try {
    // const { error } = joiShema.validate(req.body);
    // console.log(error);
    // if (error) {
    //   throw new BadRequest(400, 'missing required name field');
    // }
    const newContact = await contactsAction.addContact(req.body);
    res.status(201).json(newContact);
  // } catch (err) {
  //   next(err);
  // }
};

module.exports = add;