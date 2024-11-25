const contacts = require("../../models/contacts");
const createError = require("../../helpers/createError");
// const contactSchema = require("../../schemas/contactSchema");

const updateById = async (req, res, next) => {
  const result = await contacts.updateContact(req.params.contactId, req.body);

  if (!result) {
    throw createError(404, "Not found");
  }

  res.json(result);
};

module.exports = updateById;

// Так было до добавления validateBody:

// const updateById = async (req, res, next) => {
//   const { error } = contactSchema.validate(req.body);
//   if (error) {
//     throw createError(400, "missing fields");
//   }
//   const result = await contacts.updateContact(req.params.contactId, req.body);

//   if (!result) {
//     throw createError(404, "Not found");
//   }

//   res.json(result);
// };
