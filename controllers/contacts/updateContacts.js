const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(1).max(25).required(),
  email: Joi.string().min(1).max(15).required(),
  phone: Joi.number().required(),
  favorite: Joi.bool(),
});

const { Contact } = require("../../models");

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      const error = new Error(`contact with id=${contactId} Not Found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
