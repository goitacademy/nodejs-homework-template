const contactSchema = require("../../model/contactSchema");
const contactsOperations = require("../../model");

const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const add = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "create",
      code: 201,
      result: add,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
