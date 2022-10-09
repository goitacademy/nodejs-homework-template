const contacts = require("../../models/contacts");

const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateById = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Missing fields",
      });
    }
    const { id } = req.params;
    const result = await contacts.updateById(id, req.body);
    if (!result) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;