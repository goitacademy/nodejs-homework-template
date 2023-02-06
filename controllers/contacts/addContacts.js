const createError = require("http-errors");
// const contactsOperations = require("../../models/contacts");
const Contact = require("../../models/contact");
const { contactsSchema } = require("../../schema");

const addContacts = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, `missing required ${error.message}`);
    }
    const result = await Contact.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = addContacts;