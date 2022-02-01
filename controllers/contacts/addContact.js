// ===2===

const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;

// const createError = require("http-errors");
// const Joi = require("joi");

// const {Contact, schemas} = require("../../models/contact");

// const contactSchema = Joi.object({
//   name: Joi.string().min(2).max(30).required(),
//   email: Joi.string().email().min(5).max(30).required(),
//   phone: Joi.string().min(5).max(20).required(),
// });

// const addContact = async (req, res, next) => {
//   try {
//     const { error } = schemas.add.validate(req.body);
//     if (error) {
//       throw createError(400, {
//         message: `Missing required field: ${error.message}`,
//       });
//     }
//     const { name, email, phone } = req.body;
//     const result = await Contact.create(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     if(error.message.includes("validation failed")) {
// error.status = 400;
//     }
//     next(error);
//   }
// };
