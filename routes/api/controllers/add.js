const contacts = require("../../../models/contacts");

const validation = require("../../../models/validation");

const add = async (req, res, next) => {
  try {
    const validationResult = validation.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        message: "missing required name field",
      });
    }
    const newContact = await contacts.addContact(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
