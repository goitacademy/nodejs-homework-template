const contacts = require("../models/contacts");
const contactSchema = require("../schemas/validation");

const updById = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing fields",
      });
    }

    const { contactId } = req.params;
    const changeContact = await contacts.updateContact(contactId, req.body);
    res.json({
      status: "success",
      code: 200,
      data: {
        result: changeContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updById;
