const contacts = require("../../models/contacts");
// const createError = require("../../helpers/createError");
// const contactSchema = require("../../schemas/contactSchema");

const add = async (req, res, next) => {
  const result = await contacts.addContact(req.body);

  res.status(201).json(result);
};

module.exports = add;

// Так было до добавления validateBody:

// const add = async (req, res, next) => {
//   const { error } = contactSchema.validate(req.body);
//   if (error) {
//     // можно было в месседж указать error.message
//     throw createError(400, "missing required name field");
//   }

//   const result = await contacts.addContact(req.body);

//   res.status(201).json(result);
// };
