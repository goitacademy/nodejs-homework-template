const { Contact } = require("../../models");
const { createError } = require("../../helpers");
const { contactAddSchema } = require("../../models");

const addContact = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw createError(400, "missing required name field");
  }
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
