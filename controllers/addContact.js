const Contacts = require("../model");
const { contactSchema } = require("../validation");
const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
      status: "success",
      code: 201,
      data: { result: contact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
