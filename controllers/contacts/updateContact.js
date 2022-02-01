const createError = require("http-errors");
// ==1===
// const Joi = require("joi");
// const {Contact, schemas} = require("../../models/contact");

// ==2===
const { Contact } = require("../../models/contact");
// const contactSchema = Joi.object({
//   name: Joi.string().min(2).max(30).required(),
//   email: Joi.string().email().min(5).max(30).required(),
//   phone: Joi.string().min(5).max(20).required(),
// });

// const updateContact = async (req, res, next) => {
//   try {
//     const { error } = schema.add.validate(req.body);
//     if (error) {
//       throw createError(400, (error.message = "missing fields"));
//     }
//     const { id } = req.params;
//     const { name, email, phone } = req.body;
//     const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
//     if (!result) {
//       throw createError(404, "Not found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// ===2===
const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw createError(404, "Not found");
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateContact;
