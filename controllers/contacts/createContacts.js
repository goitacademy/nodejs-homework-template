const Joi = require("joi");
const service = require("../../service/index");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().pattern(/[0-9]{9}/),
  favorite: Joi.bool(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "pl", "gov", "net"] },
  }),
});

const createContacts = async (req, res, next) => {
  try {
    const body = req.body;
    const validation = schema.validate(body);
    if (validation.error) {
      return res.status(400).json({ message: validation.error.details[0].message });
    }

    const result = await service.addContact(body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { addedContact: result },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = createContacts;
