const { BadRequest } = require("http-errors");
const joiSchema = require("../../middlewares/validation/contacts");
const contactsOperations = require("../../model/contacts");

const addContactController = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const newContact = await contactsOperations.addContact(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = addContactController;
