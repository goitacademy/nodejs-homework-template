const contacts = require("../models/contacts");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.required(),
});

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
