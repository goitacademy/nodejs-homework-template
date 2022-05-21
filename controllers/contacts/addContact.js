const Joi = require("joi");
const contactsOperations = require("../../models/contactsOperations");

const joiShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const addContact = async (req, res, next) => {
  try {
    const { error } = joiShema.validate(req.body);
    if (error) {
      res.json({
        status: "error",
        code: 400,
        message: "missing required name field",
      });
    }

    const result = await contactsOperations.addContact(req.body);
    res.json({
      status: "success",
      code: 201,
      data: { result },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
};
module.exports = addContact;
