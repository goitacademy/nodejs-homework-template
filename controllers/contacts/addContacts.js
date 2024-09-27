const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");
const contactsPlan = require("../../plan");

const addContacts = async (req, res, next) => {
  try {
    const { error } = contactsPlan.validate(req.body);
    if (error) {
      throw createError(400, `missing required ${error.message}`);
    }
    const result = await contactsOperations.addContact(req.body);
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
