const Joi = require("joi");
const service = require("../../service/index");

const schema = Joi.object({
  name: Joi.string().min(3).max(30),
  phone: Joi.string().pattern(/[0-9]{9}/),
  favorite: Joi.bool(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "pl", "gov", "net"] },
  }),
});

const updateContacts = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  try {
    const validation = schema.validate(body);
    if (validation.error) {
      return res.status(400).json({ message: validation.error.details[0].message });
    }

    const result = await service.updateContact(contactId, body);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { updated: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = updateContacts;
