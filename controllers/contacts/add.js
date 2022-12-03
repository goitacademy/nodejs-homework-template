const { createError } = require("../../helpers");
const { addContact } = require("../../models/contacts");
const { addContactSchema } = require("../../schemas");

async function add(req, res) {
  const { error } = addContactSchema.validate(req.body);
  if (error) throw createError({ status: 400, message: error.message });

  const newContact = await addContact(req.body);
  res.json({
    status: "success",
    code: 201,
    data: newContact,
  });
}

module.exports = add;
