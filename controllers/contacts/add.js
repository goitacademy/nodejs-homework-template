// const Joi = require("joi");
const contactsOperations = require("../../models/contacts");

// const contactSchema = Joi.object({
//   name: Joi.string().min(2).max(30).required(),
//   email: Joi.string()
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net", "org"] },
//     })
//     .required(),
//   phone: Joi.string().min(5).max(20).required(),
// });

const add = async (req, res, next) => {
  try {
    // const { error } = contactSchema.validate(req.body);
    // if (error) {
    //   error.status = 400;
    //   throw error;
    // }

    const addedContact = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      addedContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
