const Joi = require("joi");
const contactsOperations = require("../../models/contactsOperations");

const joiShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateContact = async (req, res, next) => {
  try {
    const { error } = joiShema.validate(req.body);
    if (error) {
      res.json({
        status: "error",
        code: 400,
        message: "missing required name field",
      });
    }

    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);

    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id ${contactId} not found`,
      });
      return;
    }

    res.json({
      status: "success",
      code: 200,
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
module.exports = updateContact;
