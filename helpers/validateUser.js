import Joi from "@hapi/joi";
import { HttpError } from "./index.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const validateUser = (schemas) => (req, res, next) => {
  const { error } = schemas.validate(req.body);
  if (error) {
    const fieldName = error.details[0].path[0];
    throw HttpError(400, fieldName);
  }
  next();
};

export {validateUser, schemas};