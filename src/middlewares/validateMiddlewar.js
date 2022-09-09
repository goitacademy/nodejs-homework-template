const Joi = require("joi");

const postContactsValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(10).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string()
      .pattern(/^[(]?[0-9][)]?()?[0-9]?[-]?[0-9]/)
      .required(),
  });

  const validatedData = schema.validate(req.body);

  if (validatedData.error)
    return res.status(400).json("Missing required name field");
  next();
};

const putContactsValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(10),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string().pattern(/^[(]?[0-9][)]?()?[0-9]?[-]?[0-9]/),
  });
  const validatedData = schema.validate(req.body);

  if (validatedData.error) return res.status(400).json("missing fields");
  next();
};

const patchContactsValidation = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean(),
  });
  const validatedData = schema.validate(req.body);

  if (validatedData.error) return res.status(400).json("missing fields");
  next();
};

const createUserValidation = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  });
  const validateData = schema.validate(req.body);

  if (validateData.error)
    return res.json({
      status: "Bad Request",
      code: 400,
      message: "Ошибка от Joi или другой библиотеки валидации",
    });
  next();
};

const loginUserValidation = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  });
  const validateData = schema.validate(req.body);

  if (validateData.error)
    return res.json({
      status: "Bad Request",
      code: 400,
      message: "Ошибка от Joi или другой библиотеки валидации",
    });
  next();
};

module.exports = {
  postContactsValidation,
  putContactsValidation,
  patchContactsValidation,
  createUserValidation,
  loginUserValidation,
};
