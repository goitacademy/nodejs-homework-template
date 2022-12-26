const contactsOperations = require("../../models/contacts");

const contactSchema = require("../../schema/contacts");

const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      result: newContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
