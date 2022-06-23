// const { createError } = require("../../helpers");
// const contacts = require("../../models/contact");
// const { contactsAddSchema } = require("../../schemas/contacts");

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

// const addContact = async (req, res) => {
//   const { error } = contactsAddSchema.validate(req.body);
//   if (error) {
//     throw createError(400, error.message);
//   }
//   const result = await contacts.addContact(req.body);
//   res.status(201).json(result);
// };

module.exports = addContact;
