const contactsOperations = require("../../models/contacts");
const { contactValid } = require("../../helpers/");

const add = async (req, res, next) => {
  try {
    const { error } = contactValid.validate(req.body);
    if (error) {
      const pathToField = error.details[0].path;
      res.status(400).json({
        message: `missing required ${pathToField} field`,
      });
      return;
    }
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
