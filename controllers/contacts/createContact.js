const contactsController = require("../../models/contacts");
const { createContactSchema } = require("../../schemas");

async function createContact(req, res, next) {
  try {
    const { name, email, phone } = req.body;
    const { error } = createContactSchema.validate({ name, email, phone });

    if (error) {
      const err = new Error(error.message);
      err.code = 400;
      throw err;
    }

    const newContact = await contactsController.addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createContact,
};
