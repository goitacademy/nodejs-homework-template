const Joi = require("joi");

function controlValidation(req, res, next) {
  const createContactsSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  const validate = createContactsSchema.validate(req.body);
  if (validate.error) {
    return res.status(400).send({ message: "missing required name field" });
  }
  next();
}

function PatchContact(req, res, next) {
  const createValate = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email(),
    phone: Joi.string(),
  }).min(1);
  const pachValid = createValate.validate(req.body);
  if (pachValid.error) {
    return res.status(400).send({ message: "missing fields" });
  }
  next();
}

exports.controlValidation = controlValidation;
exports.PatchContact = PatchContact;
