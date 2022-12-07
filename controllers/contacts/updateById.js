const Joi = require("joi");
const { NotFound } = require("http-errors");
const { updateContactById } = require("../../models/contacts");

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(255).alphanum(),
  email: Joi.string().min(4).max(255).email(),
  phone: Joi.string().min(4).max(20).pattern(phoneRegExp),
}).min(1);

const updateById = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { id } = req.params;
    const result = await updateContactById(id, req.body);
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
